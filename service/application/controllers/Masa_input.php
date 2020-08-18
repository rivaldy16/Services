<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . 'libraries/REST_Controller.php';

class Masa_input extends REST_Controller {

    public function __construct(){
        parent::__construct();

        $this->load->model('Masa_input_model', 'masa_input');
    }

    public function get_data_post(){
        //PARAMETER
        $start = $this->post('start');
        $length = $this->post('length');
        $sort = $this->post('sort');
        $order = $this->post('order');
        $id_masa_input = $this->post('id_masa_input');
        $id_tahap = $this->post('id_tahap');
        $tahun = $this->post('tahun');

        $data = array();
        $where = array();
        $like = array();

        if($id_masa_input){
            $where['m_masa_input.id_masa_input'] = $id_masa_input;
        }

        if($id_tahap){
            $where['m_masa_input.id_tahap'] = $id_tahap;
        }

        if($tahun){
            $where['m_masa_input.tahun'] = $tahun;
        }

        $data = $this->masa_input->get($start, $length, $sort, $order, $where, $like);

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

        $data = $this->masa_input->update(array('id_masa_input' => $post['id_masa_input']), $post);
        $data = $post['id_masa_input'];

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
}

