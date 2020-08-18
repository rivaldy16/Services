<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . 'libraries/REST_Controller.php';

class Kode_skpd extends REST_Controller {

    public function __construct(){
        parent::__construct();

        $this->load->model('Kode_skpd_model', 'kode_skpd');
    }

    public function get_data_post(){
        //PARAMETER
        $start = $this->post('start');
        $length = $this->post('length');
        $sort = $this->post('sort');
        $order = $this->post('order');
        $id_kode_skpd = $this->post('id_kode_skpd');
        $kode_skpd = $this->post('kode_skpd');

        $data = array();
        $where = array();
        $like = array();

        if($id_kode_skpd){
            $where['id_kode_skpd'] = $id_kode_skpd;
        }

        if($kode_skpd){
            $like['kode_skpd'] = $kode_skpd;
        }

        $data = $this->kode_skpd->get($start, $length, $sort, $order, $where, $like);

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

        $data_kode_skpd = $this->kode_skpd->get(null, null, null, null, array('id_kode_skpd' => $post['id_kode_skpd']), null);

        if($data_kode_skpd){
            $data = $this->kode_skpd->update(array('id_kode_skpd' => $post['id_kode_skpd']), $post);
            $data = $post['id_kode_skpd'];
        }else{
            $data = $this->kode_skpd->insert($post);
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
        $data = $this->kode_skpd->delete($this->post());

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

