<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . 'libraries/REST_Controller.php';

class Unor extends REST_Controller {

    public function __construct(){
        parent::__construct();

        $this->load->model('Unor_model', 'unor');
    }

    public function get_data_post(){
        //PARAMETER
        $start = $this->post('start');
        $length = $this->post('length');
        $sort = $this->post('sort');
        $order = $this->post('order');
        $id_unor = $this->post('id_unor');
        $kode_unor = $this->post('kode_unor');

        $data = array();
        $where = array();
        $like = array();

        if($id_unor){
            $where['id_unor'] = $id_unor;
        }

        if($kode_unor){
            $like['kode_unor'] = $kode_unor;
        }

        $data = $this->unor->get($start, $length, $sort, $order, $where, $like);

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

        $data_unor = $this->unor->get(null, null, null, null, array('id_unor' => $post['id_unor_lama']), null);

        $id_unor_lama = $post['id_unor_lama'];
        unset($post['id_unor_lama']);

        if($data_unor){
            $data = $this->unor->update(array('id_unor' => $id_unor_lama), $post);
            $data = $post['id_unor'];
        }else{
            $data = $this->unor->insert($post);
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
        $data = $this->unor->delete($this->post());

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

