<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . 'libraries/REST_Controller.php';

class Rinci_detail extends REST_Controller {

    public function __construct(){
        parent::__construct();

        $this->load->model('Rinci_detail_model', 'rinci_detail');
        $this->load->model('Rinci_model', 'rinci');
    }

    public function get_data_post(){
        //PARAMETER
        $start = $this->post('start');
        $length = $this->post('length');
        $sort = $this->post('sort');
        $order = $this->post('order');
        $id_rinci_detail = $this->post('id_rinci_detail');
        $id_parent = $this->post('id_parent');
        $id_rinci = $this->post('id_rinci');
        $child_level = $this->post('child_level');
        $kode_path = $this->post('kode_path');
        $uraian = $this->post('uraian');
        $volume = $this->post('volume');
        $satuan = $this->post('satuan');
        $harga_satuan = $this->post('harga_satuan');
        $jumlah = $this->post('jumlah');
        $data = array();
        $where = array();
        $like = array();
        $having = array();

        if($id_rinci_detail){
            $where['id_rinci_detail'] = $id_rinci_detail;
        }

        if($id_parent){
            if($id_parent == "NULL"){
                $where['id_parent IS NULL'] = NULL;
            }else{
                $where['id_parent'] = $id_parent;
            }
        }

        if($id_rinci){
            $where['id_rinci'] = $id_rinci;
        }

        if($child_level){
            $where['child_level'] = $child_level;
        }

        if($kode_path){
            $like['kode_path'] = $kode_path;
        }
        
        if($uraian){
            $like['uraian'] = $uraian;
        }
        
        if($volume){
            $like['volume'] = $volume;
        }
        
        if($satuan){
            $like['satuan'] = $satuan;
        }
        
        if($harga_satuan){
            $like['harga_satuan'] = $harga_satuan;
        }
        
        if($jumlah){
            $having['jumlah'] = $jumlah;
        }
        
        $data = $this->rinci_detail->get($start, $length, $sort, $order, $where, $like, $having);

        if($data){
            $response['status'] = 200;
            $response['success'] = true;
            $response['message'] = 'Success';
            $response['count'] = count($data);
            $response['param'] = $this->post();
            $response['data'] = $data;
        }else{
            $response['status'] = 404;
            $response['success'] = false;
            $response['message'] = 'Failed';
            $response['count'] = 0;
            $response['param'] = null;
            $response['data'] = null;
        }

        $this->response($response);
    }
    
    public function save_post(){
        $data = null;
        $post = $this->post();

        if($post['id_parent']){
            $data_parent_rinci_detail = $this->rinci_detail->get(null, null, null, null, array('id_rinci_detail' => $post['id_parent']), null);
            if($data_parent_rinci_detail){
                $post['child_level'] = $data_parent_rinci_detail['0']->child_level + 1;

                $this->rinci_detail->update(array('id_rinci_detail' => $post['id_parent']), array(
                    'volume' => NULL,
                    'satuan' => NULL,
                    'harga_satuan' => NULL,
                ));
            }
        }else{
            $post['child_level'] = 1;
        }

        $data_rinci_detail= $this->rinci_detail->get(null, null, null, null, array('id_rinci_detail' => $post['id_rinci_detail']), null);

        if($data_rinci_detail){
            $data = $this->rinci_detail->update(array('id_rinci_detail' => $post['id_rinci_detail']), $post);
            $data = $post['id_rinci_detail'];
        }else{
            $data = $this->rinci_detail->insert($post);
        }

        if($data){
            $response['status'] = 200;
            $response['success'] = true;
            $response['message'] = 'Success';
            $response['count'] = 1;
            $response['param'] = $this->post();
            $response['data'] = $data;
        }else{
            $response['status'] = 404;
            $response['success'] = false;
            $response['message'] = 'Failed';
            $response['count'] = 0;
            $response['param'] = null;
            $response['data'] = null;
        }

        $this->response($response);
    }

    public function sync_post(){
        $data = false;
        $post = $this->post();

        $data_service = (Array) json_decode($post['data_service']);

        if($data_service){
            $data_rinci_detail = array();
            foreach($data_service as $row){
                if($row->rinci){
                    foreach($row->rinci as $r){
                        if($r->level == 'RINCIAN_DETAIL'){
                            $arr_kode_path = explode('.', $r->kd_rek);
                            $kode_path_rinci = $arr_kode_path[0] . '.' . $arr_kode_path[1] . '.' . $arr_kode_path[2] . '.' . $arr_kode_path[3] . '.' . $arr_kode_path[4] . '.';

                            $rinci = $this->rinci->get(null, null, null, null, array(
                                'm_akun.kode_path' => $kode_path_rinci,
                                't_rinci.id_prokeg_skpd' => $row->id_prokeg_skpd,
                            ), array());

                            if($rinci){
                                $r->id_rinci = $rinci[0]->id_rinci;
                                $data_rinci_detail[$r->id_index] = $r;
                            }
                        }
                    }
                }
            }

            foreach($data_rinci_detail as $row){
                $rinci_detail = $this->rinci_detail->get(null, null, null, null, array(
                    't_rinci_detail.id_rinci' => $row->id_rinci,
                    't_rinci_detail.kode_path' => $row->kd_rek,
                ), array());
                if(!$rinci_detail){
                    if(!array_key_exists($row->id_parent, $data_rinci_detail)){
                        $value = array(
                            'id_parent' => NULL,
                            'id_rinci' => $row->id_rinci,
                            'child_level' => '1',
                            'kode_path' => $row->kd_rek,
                            'uraian' => $row->uraian,
                            'volume' => $row->vol,
                            'satuan' => $row->satuan,
                            'harga_satuan' => $row->harga_satuan,
                        );
                        $this->rinci_detail->insert($value);
                    }else{
                        $rinci_detail_parent = $this->rinci_detail->get(null, null, null, null, array(
                            't_rinci_detail.id_rinci' => $row->id_rinci,
                            't_rinci_detail.kode_path' => $data_rinci_detail[$row->id_parent]->kd_rek,
                        ), array());
                        if($rinci_detail_parent){
                            $value = array(
                                'id_parent' => $rinci_detail_parent[0]->id_rinci_detail,
                                'id_rinci' => $row->id_rinci,
                                'child_level' => $rinci_detail_parent[0]->child_level + 1,
                                'kode_path' => $row->kd_rek,
                                'uraian' => $row->uraian,
                                'volume' => $row->vol,
                                'satuan' => $row->satuan,
                                'harga_satuan' => $row->harga_satuan,
                            );
                            $this->rinci_detail->insert($value);
                        }
                    }
                }
            }
        }

        unset($post['data_service']);

        $response['status'] = 200;
        $response['success'] = true;
        $response['message'] = 'Success';
        $response['count'] = 1;
        $response['param'] = $post;
        $response['data'] = $data;

        $this->response($response);
    }

    public function del_post(){
        $data = $this->rinci_detail->delete($this->post());

        if($data){
            $response['status'] = 200;
            $response['success'] = true;
            $response['message'] = 'Success';
            $response['count'] = 1;
            $response['param'] = $this->post();
            $response['data'] = $data . ' data is deleted';
        }else{
            $response['status'] = 404;
            $response['success'] = false;
            $response['message'] = 'Failed';
            $response['count'] = 0;
            $response['param'] = null;
            $response['data'] = null;
        }

        $this->response($response);
    }
}

