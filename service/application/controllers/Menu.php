<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . 'libraries/REST_Controller.php';

class Menu extends REST_Controller {

    public function __construct(){
        parent::__construct();

        $this->load->model('Menu_model', 'menu');
    }

    public function get_data_post(){
        //PARAMETER
        $start = $this->post('start');
        $length = $this->post('length');
        $sort = $this->post('sort');
        $order = $this->post('order');
        $id_menu = $this->post('id_menu');
        $id_parent = $this->post('id_parent');
        $index = $this->post('index');
        $nama = $this->post('nama');
        $path = $this->post('path');
        $icon = $this->post('icon');

        $data = array();
        $where = array();
        $like = array();

        if($id_menu){
            $where['id_menu'] = $id_menu;
        }

        if($id_parent){
            if($id_parent == "NULL"){
                $where['id_parent IS NULL'] = NULL;
            }else{
                $where['id_parent'] = $id_parent;
            }
        }

        if($index){
            $where['index'] = $index;
        }

        if($nama){
            $like['nama'] = $nama;
        }

        if($path){
            $like['path'] = $path;
        }

        if($icon){
            $like['icon'] = $icon;
        }

        $data = $this->menu->get($start, $length, $sort, $order, $where, $like);

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

        $data_menu = $this->menu->get(null, null, null, null, array('id_menu' => $post['id_menu']), null);

        if($data_menu){
            $data = $this->menu->update(array('id_menu' => $post['id_menu']), $post);
            $data = $post['id_menu'];
        }else{
            $data = $this->menu->insert($post);
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
        $data = $this->menu->delete($this->post());

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

