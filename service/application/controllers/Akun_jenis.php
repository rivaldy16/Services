<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . 'libraries/REST_Controller.php';

class Akun_jenis extends REST_Controller {

    public function __construct(){
        parent::__construct();

        $this->load->model('Akun_jenis_model', 'akun_jenis');
    }

    public function get_data_post(){
        //PARAMETER
        $start = $this->post('start');
        $length = $this->post('length');
        $sort = $this->post('sort');
        $order = $this->post('order');
        $id_akun_jenis = $this->post('id_akun_jenis');
        $id_parent = $this->post('id_parent');
        $uraian = $this->post('uraian');

        $data = array();
        $where = array();
        $like = array();

        if($id_akun_jenis){
            $where['id_akun_jenis'] = $id_akun_jenis;
        }

        if($id_parent){
            if($id_parent == "NULL"){
                $where['id_parent IS NULL'] = NULL;
            }else{
                $where['id_parent'] = $id_parent;
            }
        }

        if($uraian){
            $like['uraian'] = $uraian;
        }

        $data = $this->akun_jenis->get($start, $length, $sort, $order, $where, $like);

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

        $data_akun_jenis = $this->akun_jenis->get(null, null, null, null, array('id_akun_jenis' => $post['id_akun_jenis']), null);

        if($data_akun_jenis){
            $data = $this->akun_jenis->update(array('id_akun_jenis' => $post['id_akun_jenis']), $post);
            $data = $post['id_akun_jenis'];
        }else{
            $data = $this->akun_jenis->insert($post);
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
    
    public function del_post(){
        $data = $this->akun_jenis->delete($this->post());

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

