<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . 'libraries/REST_Controller.php';

class Angkas_rinci extends REST_Controller {

    public function __construct(){
        parent::__construct();

        $this->load->model('Angkas_rinci_model', 'angkas_rinci');
        $this->load->model('Rinci_model', 'rinci');
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
        $id_angkas_rinci = $this->post('id_angkas_rinci');
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
        
        if($id_angkas_rinci){
            $where['t_angkas_rinci.id_angkas_rinci'] = $id_angkas_rinci;
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
        
        $data = $this->angkas_rinci->get($start, $length, $sort, $order, $where, $like);

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

        $data_angkas_rinci = $this->angkas_rinci->get(null, null, null, null, array('id_angkas_rinci' => $post['id_angkas_rinci']), null);

        if($data_angkas_rinci){
            $data = $this->angkas_rinci->update(array('id_angkas_rinci' => $post['id_angkas_rinci']), $post);
            $data = $post['id_angkas_rinci'];
        }else{
            $data = $this->angkas_rinci->insert($post);
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
                            $rinci = $this->rinci->get(null, null, null, null, array(
                                'm_akun.kode_path' => $r->kd_rek,
                                't_rinci.id_prokeg_skpd' => $row->id_prokeg_skpd,
                            ), array());
                            if($rinci){
                                $angkas_rinci = $this->angkas_rinci->get(null, null, null, null, array(
                                    't_angkas_rinci.id_rinci' => $rinci[0]->id_rinci,
                                ), array());
                                $value = array(
                                    'id_rinci' => $rinci[0]->id_rinci,
                                    'jumlah_01' => $r->total,
                                    'jumlah_02' => '0.00',
                                    'jumlah_03' => '0.00',
                                    'jumlah_04' => '0.00',
                                    'jumlah_05' => '0.00',
                                    'jumlah_06' => '0.00',
                                    'jumlah_07' => '0.00',
                                    'jumlah_08' => '0.00',
                                    'jumlah_09' => '0.00',
                                    'jumlah_10' => '0.00',
                                    'jumlah_11' => '0.00',
                                    'jumlah_12' => '0.00',
                                );
                                if($angkas_rinci){
                                    $this->angkas_rinci->update(array('id_angkas_rinci' => $angkas_rinci[0]->id_angkas_rinci), $value);
                                }else{
                                    $this->angkas_rinci->insert($value);
                                }
                            }
                        }
                    }
                }
            }
        }

        unset($post['data_service']);

        if($data){
            $response['status'] = 200;
            $response['success'] = true;
            $response['message'] = 'Success';
            $response['count'] = 1;
            $response['param'] = $post;
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

    public function del_post(){
        $data = $this->angkas_rinci->delete($this->post());

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

