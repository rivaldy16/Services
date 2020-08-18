<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . 'libraries/REST_Controller.php';

class Anggaran_kegiatan extends REST_Controller {

    public function __construct(){
        parent::__construct();

        $this->load->model('Anggaran_kegiatan_model', 'anggaran_kegiatan');
    }

    public function get_data_post(){
        //PARAMETER
        $start = $this->post('start');
        $length = $this->post('length');
        $sort = $this->post('sort');
        $order = $this->post('order');
        $id_anggaran_kegiatan = $this->post('id_anggaran_kegiatan');
        $id_anggaran_jenis = $this->post('id_anggaran_jenis');
        $id_prokeg_skpd = $this->post('id_prokeg_skpd');
        $id_parent = $this->post('id_parent');
        $id_skpd = $this->post('id_skpd');
        $id_prokeg = $this->post('id_prokeg');
        $id_prokeg_jenis = $this->post('id_prokeg_jenis');
        $id_tahap = $this->post('id_tahap');
        $tahun = $this->post('tahun');
        $kode_path = $this->post('kode_path');
        $uraian = $this->post('uraian');
        $data = array();
        $where = array();
        $like = array();

        if($id_anggaran_kegiatan){
            $where['t_anggaran_kegiatan.id_anggaran_kegiatan'] = $id_anggaran_kegiatan;
        }

        if($id_anggaran_jenis){
            $where['m_anggaran_jenis.id_anggaran_jenis'] = $id_anggaran_jenis;
        }

        if($id_prokeg_skpd){
            $where['t_prokeg_skpd.id_prokeg_skpd'] = $id_prokeg_skpd;
        }

        if($id_parent){
            if($id_parent == "NULL"){
                $where['t_prokeg_skpd.id_parent IS NULL'] = NULL;
            }else{
                $where['t_prokeg_skpd.id_parent'] = $id_parent;
            }
        }
        
        if($id_skpd){
            $where['t_prokeg_skpd.id_skpd'] = $id_skpd;
        }
        
        if($id_prokeg){
            $where['t_prokeg_skpd.id_prokeg'] = $id_prokeg;
        }

        if($id_prokeg_jenis){
            $where['m_prokeg.id_prokeg_jenis'] = $id_prokeg_jenis;
        }
        
        if($id_tahap){
            $where['t_prokeg_skpd.id_tahap'] = $id_tahap;
        }
        
        if($tahun){
            $where['t_prokeg_skpd.tahun'] = $tahun;
        }
        
        if($kode_path){
            $like['t_prokeg_skpd.kode_path'] = $kode_path;
        }
        
        if($uraian){
            $like['m_prokeg.uraian'] = $uraian;
        }
        
        $data = $this->anggaran_kegiatan->get($start, $length, $sort, $order, $where, $like);

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

        $data_anggaran_kegiatan = $this->anggaran_kegiatan->get(null, null, null, null, array('id_anggaran_kegiatan' => $post['id_anggaran_kegiatan']), null);

        if($data_anggaran_kegiatan){
            $data = $this->anggaran_kegiatan->update(array('id_anggaran_kegiatan' => $post['id_anggaran_kegiatan']), $post);
            $data = $post['id_anggaran_kegiatan'];
        }else{
            $data = $this->anggaran_kegiatan->insert($post);
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

    public function sync_post(){
        $data = false;
        $post = $this->post();

        $data_service = (Array) json_decode($post['data_service']);

        foreach($data_service as $row){
            $data_anggaran_kegiatan = $this->anggaran_kegiatan->get(null, null, null, null, array(
                't_prokeg_skpd.id_tahap' => $post['id_tahap'],
                't_prokeg_skpd.id_skpd' => $post['id_skpd'],
                't_prokeg_skpd.tahun' => $post['tahun'],
            ), array(
                't_prokeg_skpd.kode_path' => $row->kode_kegiatan
            ));

            if($data_anggaran_kegiatan){
                if($data_anggaran_kegiatan[0]->id_anggaran_kegiatan){
                    $data_update = array(
                        'id_prokeg_skpd' => $data_anggaran_kegiatan[0]->id_prokeg_skpd,
                        'id_anggaran_jenis' => '3',
                        'pagu' => $row->pagu,
                    );
                    $this->anggaran_kegiatan->update(array('id_anggaran_kegiatan' => $data_anggaran_kegiatan[0]->id_anggaran_kegiatan), $data_update);
                }else{
                    $data_insert = array(
                        'id_prokeg_skpd' => $data_anggaran_kegiatan[0]->id_prokeg_skpd,
                        'id_anggaran_jenis' => '3',
                        'pagu' => $row->pagu,
                    );
                    $insert = $this->anggaran_kegiatan->insert($data_insert);
                }
                $data = true;
            }
        }

        unset($post['data_service']);

        if($data){
            $response['status'] = 200;
            $response['success'] = true;
            $response['message'] = 'Success';
            $response['count'] = 1;
            $response['param'] = $post;
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
        $data = $this->anggaran_kegiatan->delete($this->post());

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

