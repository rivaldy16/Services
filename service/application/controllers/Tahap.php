<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . 'libraries/REST_Controller.php';

class Tahap extends REST_Controller {

    public function __construct(){
        parent::__construct();

        $this->load->model('Tahap_model', 'tahap');
    }

    public function get_data_post(){
        //PARAMETER
        $start = $this->post('start');
        $length = $this->post('length');
        $sort = $this->post('sort');
        $order = $this->post('order');
        $id_tahap = $this->post('id_tahap');
        $tahap = $this->post('tahap');
        $jenis = $this->post('jenis');
        $uraian = $this->post('uraian');

        $data = array();
        $where = array();
        $like = array();

        if($id_tahap){
            $where['id_tahap'] = $id_tahap;
        }

        if($jenis){
            $where['jenis'] = $jenis;
        }

        if($tahap){
            $like['tahap'] = $tahap;
        }

        if($uraian){
            $like['uraian'] = $uraian;
        }

        $data = $this->tahap->get($start, $length, $sort, $order, $where, $like);

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

        $data_tahap = $this->tahap->get(null, null, null, null, array('id_tahap' => $post['id_tahap']), null);

        if($data_tahap){
            $data = $this->tahap->update(array('id_tahap' => $post['id_tahap']), $post);
            $data = $post['id_tahap'];
        }else{
            $data = $this->tahap->insert($post);
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
        $data = $this->tahap->delete($this->post());

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

