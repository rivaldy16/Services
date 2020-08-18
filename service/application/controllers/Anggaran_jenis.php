<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . 'libraries/REST_Controller.php';

class Anggaran_jenis extends REST_Controller {

    public function __construct(){
        parent::__construct();

        $this->load->model('Anggaran_jenis_model', 'anggaran_jenis');
    }

    public function get_data_post(){
        //PARAMETER
        $start = $this->post('start');
        $length = $this->post('length');
        $sort = $this->post('sort');
        $order = $this->post('order');
        $id_anggaran_jenis = $this->post('id_anggaran_jenis');
        $uraian = $this->post('uraian');
        $kode = $this->post('kode');

        $data = array();
        $where = array();
        $like = array();

        if($id_anggaran_jenis){
            $where['id_anggaran_jenis'] = $id_anggaran_jenis;
        }

        if($uraian){
            $like['uraian'] = $uraian;
        }

        if($kode){
            $like['kode'] = $kode;
        }

        $data = $this->anggaran_jenis->get($start, $length, $sort, $order, $where, $like);

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

        $data_anggaran_jenis = $this->anggaran_jenis->get(null, null, null, null, array('id_anggaran_jenis' => $post['id_anggaran_jenis']), null);

        if($data_anggaran_jenis){
            $data = $this->anggaran_jenis->update(array('id_anggaran_jenis' => $post['id_anggaran_jenis']), $post);
            $data = $post['id_anggaran_jenis'];
        }else{
            $data = $this->anggaran_jenis->insert($post);
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
        $data = $this->anggaran_jenis->delete($this->post());

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

