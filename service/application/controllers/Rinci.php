<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . 'libraries/REST_Controller.php';

class Rinci extends REST_Controller {

    public function __construct(){
        parent::__construct();

        $this->load->model('Rinci_model', 'rinci');
        $this->load->model('Akun_model', 'akun');
    }

    public function get_data_post(){
        //PARAMETER
        $start = $this->post('start');
        $length = $this->post('length');
        $sort = $this->post('sort');
        $order = $this->post('order');
        $id_rinci = $this->post('id_rinci');
        $id_parent = $this->post('id_parent');
        $id_prokeg_skpd = $this->post('id_prokeg_skpd');
        $id_akun = $this->post('id_akun');
        $id_akun_jenis = $this->post('id_akun_jenis');
        $kode_akun = $this->post('kode_akun');
        $kode_path_akun = $this->post('kode_path_akun');
        $uraian_akun = $this->post('uraian_akun');
        $data = array();
        $where = array();
        $like = array();

        if($id_rinci){
            $where['t_rinci.id_rinci'] = $id_rinci;
        }

        if($id_parent){
            if($id_parent == "NULL"){
                $where['t_rinci.id_parent IS NULL'] = NULL;
            }else{
                $where['t_rinci.id_parent'] = $id_parent;
            }
        }

        if($id_prokeg_skpd){
            $where['t_rinci.id_prokeg_skpd'] = $id_prokeg_skpd;
        }
        
        if($id_akun){
            $where['t_rinci.id_akun'] = $id_akun;
        }
        
        if($id_akun_jenis){
            $where['m_akun.id_akun_jenis'] = $id_akun_jenis;
        }
        
        if($kode_akun){
            $like['m_akun.kode'] = $kode_akun;
        }
        
        if($kode_path_akun){
            $like['m_akun.kode_path'] = $kode_path_akun;
        }
        
        if($uraian_akun){
            $like['m_akun.uraian'] = $uraian_akun;
        }
        
        $data = $this->rinci->get($start, $length, $sort, $order, $where, $like);

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

        $data_rinci = $this->rinci->get(null, null, null, null, array('id_rinci' => $post['id_rinci']), null);

        if($data_rinci){
            $data = $this->rinci->update(array('id_rinci' => $post['id_rinci']), $post);
            $data = $post['id_rinci'];
        }else{
            $data = $this->rinci->insert($post);
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
            foreach($data_service as $row){
                if($row->rinci){
                    foreach($row->rinci as $r){
                        if($r->level == 'RINCIAN'){
                            $data_akun = array();
                            $arr_kode_path = explode('.', $r->kd_rek);

                            $akun = $this->akun->get(null, null, null, null, array(
                                'm_akun.id_tahap' => $post['id_tahap'],
                                'm_akun.tahun' => $post['tahun'],
                                'm_akun.kode_path' => $r->kd_rek,
                            ), array());

                            if($akun){
                                $akun[0]->kode_path_parent = $arr_kode_path[0] . '.' . $arr_kode_path[1] . '.' . $arr_kode_path[2] . '.' . $arr_kode_path[3] . '.';
                                $data_akun[$akun[0]->kode_path] = $akun[0];
                                $id_parent = $akun[0]->id_parent;

                                while($id_parent){
                                    $kode_path_parent = '';

                                    $akun_parent = $this->akun->get(null, null, null, null, array('m_akun.id_akun' => $id_parent), array());
                                    $akun_grandparent = $this->akun->get(null, null, null, null, array('m_akun.id_akun' => $akun_parent[0]->id_parent), array());
                                    if($akun_grandparent){
                                        $kode_path_parent = $akun_grandparent[0]->kode_path;
                                    }

                                    $akun_parent[0]->kode_path_parent = $kode_path_parent;
                                    $data_akun[$akun_parent[0]->kode_path] = $akun_parent[0];

                                    $id_parent = $akun_parent[0]->id_parent;
                                }
                                ksort($data_akun);
                            }

                            foreach($data_akun as $da){
                                $rinci = $this->rinci->get(null, null, null, null, array(
                                    't_rinci.id_prokeg_skpd' => $row->id_prokeg_skpd,
                                    't_rinci.id_akun' => $da->id_akun,
                                ), array());
                                if(!$rinci){
                                    if(!$da->id_parent){
                                        $value = array(
                                            'id_parent' => NULL,
                                            'id_akun' => $da->id_akun,
                                            'id_prokeg_skpd' => $row->id_prokeg_skpd,
                                        );
                                        $this->rinci->insert($value);
                                    }else{
                                        $akun_parent = $this->akun->get(null, null, null, null, array(
                                            'm_akun.id_tahap' => $post['id_tahap'],
                                            'm_akun.tahun' => $post['tahun'],
                                            'm_akun.kode_path' => $data_akun[$da->kode_path_parent]->kode_path,
                                        ), array());
                                        if($akun_parent){
                                            $rinci_parent = $this->rinci->get(null, null, null, null, array(
                                                't_rinci.id_prokeg_skpd' => $row->id_prokeg_skpd,
                                                't_rinci.id_akun' => $akun_parent[0]->id_akun,
                                            ), array());
                                            if($rinci_parent){
                                                $value = array(
                                                    'id_parent' => $rinci_parent[0]->id_rinci,
                                                    'id_akun' => $da->id_akun,
                                                    'id_prokeg_skpd' => $row->id_prokeg_skpd,
                                                );
                                                $this->rinci->insert($value);
                                            }
                                        }
                                    }
                                }
                            }
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
        $data = $this->rinci->delete($this->post());

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

