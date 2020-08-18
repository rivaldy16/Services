<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . 'libraries/REST_Controller.php';

class Prokeg extends REST_Controller {

    public function __construct(){
        parent::__construct();

        $this->load->model('Prokeg_model', 'prokeg');
    }

    public function get_data_post(){
        //PARAMETER
        $start = $this->post('start');
        $length = $this->post('length');
        $sort = $this->post('sort');
        $order = $this->post('order');
        $id_prokeg = $this->post('id_prokeg');
        $id_parent = $this->post('id_parent');
        $id_prokeg_jenis = $this->post('id_prokeg_jenis');
        $id_tahap = $this->post('id_tahap');
        $uraian = $this->post('uraian');
        $kode = $this->post('kode');
        $kode_path = $this->post('kode_path');
        $tahun = $this->post('tahun');

        $data = array();
        $where = array();
        $like = array();

        if($id_prokeg){
            $where['m_prokeg.id_prokeg'] = $id_prokeg;
        }

        if($id_parent){
            if($id_parent == "NULL"){
                $where['m_prokeg.id_parent IS NULL'] = NULL;
            }else{
                $where['m_prokeg.id_parent'] = $id_parent;
            }
        }

        if($id_prokeg_jenis){
            $where['m_prokeg.id_prokeg_jenis'] = $id_prokeg_jenis;
        }

        if($id_tahap){
            $where['m_prokeg.id_tahap'] = $id_tahap;
        }

        if($tahun){
            $where['m_prokeg.tahun'] = $tahun;
        }

        if($uraian){
            $like['m_prokeg.uraian'] = $uraian;
        }

        if($kode){
            $like['m_prokeg.kode'] = $kode;
        }

        if($kode_path){
            $like['m_prokeg.kode_path'] = $kode_path;
        }

        $data = $this->prokeg->get($start, $length, $sort, $order, $where, $like);

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
            $prokeg = $this->prokeg->get(null, null, null, null, array(
                'm_prokeg.id_prokeg_jenis' => $row->id_prokeg_jenis,
                'm_prokeg.uraian' => $row->uraian,
                'm_prokeg.kode' => $row->kode,
                'm_prokeg.kode_path' => $row->kode_path,
                'm_prokeg.id_tahap' => $tahap,
                'm_prokeg.tahun' => $tahun,
            ), array());

            if(!$prokeg){
                if($row->id_parent == "0"){
                    $data_prokeg = array(
                        'id_prokeg_jenis' => $row->id_prokeg_jenis,
                        'id_tahap' => $tahap,
                        'uraian' => $row->uraian,
                        'kode' => $row->kode,
                        'kode_path' => $row->kode_path,
                        'tahun' => $tahun,
                    );
                    $this->prokeg->insert($data_prokeg);
                }else{
                    $prokeg = $this->prokeg->get(null, null, null, null, array(
                        'm_prokeg.id_prokeg_jenis' => $data_sync[$row->id_parent]->id_prokeg_jenis,
                        'm_prokeg.id_tahap' => $tahap,
                        'm_prokeg.uraian' => $data_sync[$row->id_parent]->uraian,
                        'm_prokeg.kode' => $data_sync[$row->id_parent]->kode,
                        'm_prokeg.kode_path' => $data_sync[$row->id_parent]->kode_path,
                        'm_prokeg.tahun' => $tahun,
                    ), array());

                    if($prokeg){
                        $data_prokeg = array(
                            'id_parent' => $prokeg[0]->id_prokeg,
                            'id_prokeg_jenis' => $row->id_prokeg_jenis,
                            'id_tahap' => $tahap,
                            'uraian' => $row->uraian,
                            'kode' => $row->kode,
                            'kode_path' => $row->kode_path,
                            'tahun' => $tahun,
                        );
                        $this->prokeg->insert($data_prokeg);
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

        $data_prokeg = $this->prokeg->get(null, null, null, null, array('id_prokeg' => $post['id_prokeg']), null);

        if($data_prokeg){
            $data = $this->prokeg->update(array('id_prokeg' => $post['id_prokeg']), $post);
            $data = $post['id_prokeg'];
        }else{
            $data = $this->prokeg->insert($post);
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
        $data = $this->prokeg->delete($this->post());

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
