<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . 'libraries/REST_Controller.php';

class Akun extends REST_Controller {

    public function __construct(){
        parent::__construct();

        $this->load->model('Akun_model', 'akun');
    }

    public function get_data_post(){
        //PARAMETER
        $start = $this->post('start');
        $length = $this->post('length');
        $sort = $this->post('sort');
        $order = $this->post('order');
        $id_akun = $this->post('id_akun');
        $id_parent = $this->post('id_parent');
        $id_akun_jenis = $this->post('id_akun_jenis');
        $id_tahap = $this->post('id_tahap');
        $uraian = $this->post('uraian');
        $kode = $this->post('kode');
        $kode_path = $this->post('kode_path');
        $tahun = $this->post('tahun');

        $data = array();
        $where = array();
        $like = array();

        if($id_akun){
            $where['m_akun.id_akun'] = $id_akun;
        }

        if($id_parent){
            if($id_parent == "NULL"){
                $where['m_akun.id_parent IS NULL'] = NULL;
            }else{
                $where['m_akun.id_parent'] = $id_parent;
            }
        }

        if($id_akun_jenis){
            $where['m_akun.id_akun_jenis'] = $id_akun_jenis;
        }

        if($id_tahap){
            $where['m_akun.id_tahap'] = $id_tahap;
        }

        if($tahun){
            $where['m_akun.tahun'] = $tahun;
        }

        if($uraian){
            $like['m_akun.uraian'] = $uraian;
        }

        if($kode){
            $like['m_akun.kode'] = $kode;
        }

        if($kode_path){
            $like['m_akun.kode_path'] = $kode_path;
        }

        $data = $this->akun->get($start, $length, $sort, $order, $where, $like);

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
    
    public function sync_post(){
        $data = array();
        $post = $this->post();
        $data_sync = (Array) json_decode($post['data_sync']);
        $tahap = $post['tahap'];
        $tahun = $post['tahun'];

        foreach ($data_sync as $row) {
            $akun = $this->akun->get(null, null, null, null, array(
                'm_akun.id_akun_jenis' => $row->id_akun_jenis,
                'm_akun.uraian' => $row->uraian,
                'm_akun.kode' => $row->kode,
                'm_akun.kode_path' => $row->kode_path,
                'm_akun.id_tahap' => $tahap,
                'm_akun.tahun' => $tahun,
            ), array());

            if(!$akun){
                if($row->id_parent == "0"){
                    $data_akun = array(
                        'id_akun_jenis' => $row->id_akun_jenis,
                        'id_tahap' => $tahap,
                        'uraian' => $row->uraian,
                        'kode' => $row->kode,
                        'kode_path' => $row->kode_path,
                        'tahun' => $tahun,
                    );
                    $this->akun->insert($data_akun);
                }else{
                    $akun = $this->akun->get(null, null, null, null, array(
                        'm_akun.id_akun_jenis' => $data_sync[$row->id_parent]->id_akun_jenis,
                        'm_akun.id_tahap' => $tahap,
                        'm_akun.uraian' => $data_sync[$row->id_parent]->uraian,
                        'm_akun.kode' => $data_sync[$row->id_parent]->kode,
                        'm_akun.kode_path' => $data_sync[$row->id_parent]->kode_path,
                        'm_akun.tahun' => $tahun,
                    ), array());

                    if($akun){
                        $data_akun = array(
                            'id_parent' => $akun[0]->id_akun,
                            'id_akun_jenis' => $row->id_akun_jenis,
                            'id_tahap' => $tahap,
                            'uraian' => $row->uraian,
                            'kode' => $row->kode,
                            'kode_path' => $row->kode_path,
                            'tahun' => $tahun,
                        );
                        $this->akun->insert($data_akun);
                    }
                }
                $data[] = $row;
            }
        }

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

        $data_akun = $this->akun->get(null, null, null, null, array('id_akun' => $post['id_akun']), null);

        if($data_akun){
            $data = $this->akun->update(array('id_akun' => $post['id_akun']), $post);
            $data = $post['id_akun'];
        }else{
            $data = $this->akun->insert($post);
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
        $data = $this->akun->delete($this->post());

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
