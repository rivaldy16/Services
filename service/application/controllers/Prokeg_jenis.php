<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . 'libraries/REST_Controller.php';

class Prokeg_jenis extends REST_Controller {

    public function __construct(){
        parent::__construct();

        $this->load->model('Prokeg_jenis_model', 'prokeg_jenis');
    }

    public function get_data_post(){
        //PARAMETER
        $start = $this->post('start');
        $length = $this->post('length');
        $sort = $this->post('sort');
        $order = $this->post('order');
        $id_prokeg_jenis = $this->post('id_prokeg_jenis');
        $id_parent = $this->post('id_parent');
        $uraian = $this->post('uraian');

        $data = array();
        $where = array();
        $like = array();

        if($id_prokeg_jenis){
            $where['id_prokeg_jenis'] = $id_prokeg_jenis;
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

        $data = $this->prokeg_jenis->get($start, $length, $sort, $order, $where, $like);

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

        $data_prokeg_jenis = $this->prokeg_jenis->get(null, null, null, null, array('id_prokeg_jenis' => $post['id_prokeg_jenis']), null);

        if($data_prokeg_jenis){
            $data = $this->prokeg_jenis->update(array('id_prokeg_jenis' => $post['id_prokeg_jenis']), $post);
            $data = $post['id_prokeg_jenis'];
        }else{
            $data = $this->prokeg_jenis->insert($post);
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
        $data = $this->prokeg_jenis->delete($this->post());

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

