<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . 'libraries/REST_Controller.php';

class Skpd_aktif extends REST_Controller {

    public function __construct(){
        parent::__construct();

        $this->load->model('Skpd_aktif_model', 'skpd_aktif');
    }

    public function get_data_post(){
        //PARAMETER
        $start = $this->post('start');
        $length = $this->post('length');
        $sort = $this->post('sort');
        $order = $this->post('order');
        $id_skpd_aktif = $this->post('id_skpd_aktif');
        $id_skpd = $this->post('id_skpd');
        $id_unor = $this->post('id_unor');
        $kode_unor = $this->post('kode_unor');
        $kode_skpd = $this->post('kode_skpd');
        $nama_lengkap_skpd = $this->post('nama_lengkap_skpd');
        $nama_singkat_skpd = $this->post('nama_singkat_skpd');
        $kode_unor = $this->post('kode_unor');
        $tahun = $this->post('tahun');

        $data = array();
        $where = array();
        $like = array();

        if($id_skpd_aktif){
            $where['t_skpd_aktif.id_skpd_aktif'] = $id_skpd_aktif;
        }

        if($id_skpd){
            $where['t_skpd_aktif.id_skpd'] = $id_skpd;
        }

        if($id_unor){
            $where['t_skpd_aktif.id_unor'] = $id_unor;
        }

        if($kode_unor){
            $like['m_kode_unor.kode_unor'] = $kode_unor;
        }

        if($kode_skpd){
            $like['m_kode_skpd.kode_skpd'] = $kode_skpd;
        }

        if($nama_lengkap_skpd){
            $like['m_skpd.nama_lengkap'] = $nama_lengkap_skpd;
        }

        if($nama_singkat_skpd){
            $like['m_skpd.nama_singkat'] = $nama_singkat_skpd;
        }

        if($kode_unor){
            $like['m_unor.kode_unor'] = $kode_unor;
        }

        if($tahun){
            $where['t_skpd_aktif.tahun'] = $tahun;
        }

        $data = $this->skpd_aktif->get($start, $length, $sort, $order, $where, $like);

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

        $data_skpd_aktif = $this->skpd_aktif->get(null, null, null, null, array('id_skpd_aktif' => $post['id_skpd_aktif']), null);

        if($data_skpd_aktif){
            $data = $this->skpd_aktif->update(array('id_skpd_aktif' => $post['id_skpd_aktif']), $post);
            $data = $post['id_skpd_aktif'];
        }else{
            $data = $this->skpd_aktif->insert($post);
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
        $data = $this->skpd_aktif->delete($this->post());

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

