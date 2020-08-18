<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . 'libraries/REST_Controller.php';

class Header extends REST_Controller {

    public function __construct(){
        parent::__construct();

        $this->load->model('Header_model', 'header');
    }

    public function get_data_post(){
        //PARAMETER
        $start = $this->post('start');
        $length = $this->post('length');
        $sort = $this->post('sort');
        $order = $this->post('order');
        $id_header = $this->post('id_header');
        $id_sumber_dana = $this->post('id_sumber_dana');
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

        if($id_header){
            $where['t_header.id_header'] = $id_header;
        }

        if($id_sumber_dana){
            $where['m_sumber_dana.id_sumber_dana'] = $id_sumber_dana;
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
        
        $data = $this->header->get($start, $length, $sort, $order, $where, $like);

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
        $data = false;
        $post = $this->post();

        $data_service = (Array) json_decode($post['data_service']);

        if($data_service){
            foreach($data_service as $row){
                $data_header = $this->header->get(null, null, null, null, array('t_header.id_prokeg_skpd' => $row->id_prokeg_skpd), null);

                $value = array(
                    'id_prokeg_skpd' => $row->id_prokeg_skpd,
                    'id_sumber_dana' => '2',
                    'lokasi' => 'Kota Tangerang',
                    'sasaran_kegiatan' => $row->header->sasaran_kegiatan
                );

                if($data_header){
                    $this->header->update(array('id_header' => $data_header[0]->id_header), $value);
                }else{
                    $this->header->insert($value);
                }
            }
        }

        unset($post['data_service']);

        $response['status'] = 200;
        $response['success'] = true;
        $response['message'] = 'Success';
        $response['count'] = 1;
        $response['param'] = $post;
        $response['data'] = $data;

        $this->response($response);
    }

    public function save_post(){
        $data = null;
        $post = $this->post();

        $data_header = $this->header->get(null, null, null, null, array('id_header' => $post['id_header']), null);

        if($data_header){
            $data = $this->header->update(array('id_header' => $post['id_header']), $post);
            $data = $post['id_header'];
        }else{
            $data = $this->header->insert($post);
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
        $data = $this->header->delete($this->post());

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

