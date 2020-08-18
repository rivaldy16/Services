<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . 'libraries/REST_Controller.php';

class Sumber_dana extends REST_Controller {

    public function __construct(){
        parent::__construct();

        $this->load->model('Sumber_dana_model', 'sumber_dana');
    }

    public function get_data_post(){
        //PARAMETER
        $start = $this->post('start');
        $length = $this->post('length');
        $sort = $this->post('sort');
        $order = $this->post('order');
        $id_sumber_dana = $this->post('id_sumber_dana');
        $sumber_dana = $this->post('sumber_dana');

        $data = array();
        $where = array();
        $like = array();

        if($id_sumber_dana){
            $where['id_sumber_dana'] = $id_sumber_dana;
        }

        if($sumber_dana){
            $like['sumber_dana'] = $sumber_dana;
        }

        $data = $this->sumber_dana->get($start, $length, $sort, $order, $where, $like);

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

        $data_sumber_dana = $this->sumber_dana->get(null, null, null, null, array('id_sumber_dana' => $post['id_sumber_dana']), null);

        if($data_sumber_dana){
            $data = $this->sumber_dana->update(array('id_sumber_dana' => $post['id_sumber_dana']), $post);
            $data = $post['id_sumber_dana'];
        }else{
            $data = $this->sumber_dana->insert($post);
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
        $data = $this->sumber_dana->delete($this->post());

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

