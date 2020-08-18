<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . 'libraries/REST_Controller.php';

class Skpd extends REST_Controller {

    public function __construct(){
        parent::__construct();

        $this->load->model('Skpd_model', 'skpd');
    }

    public function get_data_post(){
        //PARAMETER
        $start = $this->post('start');
        $length = $this->post('length');
        $sort = $this->post('sort');
        $order = $this->post('order');
        $id_skpd = $this->post('id_skpd');
        $nama_lengkap = $this->post('nama_lengkap');
        $nama_singkat = $this->post('nama_singkat');

        $data = array();
        $where = array();
        $like = array();

        if($id_skpd){
            $where['id_skpd'] = $id_skpd;
        }

        if($nama_lengkap){
            $like['nama_lengkap'] = $nama_lengkap;
        }

        if($nama_singkat){
            $like['nama_singkat'] = $nama_singkat;
        }

        $data = $this->skpd->get($start, $length, $sort, $order, $where, $like);

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

        $data_skpd = $this->skpd->get(null, null, null, null, array('id_skpd' => $post['id_skpd']), null);

        if($data_skpd){
            $data = $this->skpd->update(array('id_skpd' => $post['id_skpd']), $post);
            $data = $post['id_skpd'];
        }else{
            $data = $this->skpd->insert($post);
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
        $data = $this->skpd->delete($this->post());

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

