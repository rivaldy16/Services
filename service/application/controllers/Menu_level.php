<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . 'libraries/REST_Controller.php';

class Menu_level extends REST_Controller {

    public function __construct(){
        parent::__construct();

        $this->load->model('Menu_level_model', 'menu_level');
    }

    public function get_data_post(){
        //PARAMETER
        $start = $this->post('start');
        $length = $this->post('length');
        $sort = $this->post('sort');
        $order = $this->post('order');
        $id_menu_level = $this->post('id_menu_level');
        $id_level = $this->post('id_level');
        $id_menu = $this->post('id_menu');

        $data = array();
        $where = array();
        $like = array();

        if($id_menu_level){
            $where['t_menu_level.id_menu_level'] = $id_menu_level;
        }

        if($id_level){
            $where['t_menu_level.id_level'] = $id_level;
        }

        if($id_menu){
            $where['t_menu_level.id_menu'] = $id_menu;
        }

        $data = $this->menu_level->get($start, $length, $sort, $order, $where, $like);

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

        $data_menu_level = $this->menu_level->get(null, null, null, null, array('id_menu_level' => $post['id_menu_level']), null);

        if($data_menu_level){
            $data = $this->menu_level->update(array('id_menu_level' => $post['id_menu_level']), $post);
            $data = $post['id_menu_level'];
        }else{
            $data = $this->menu_level->insert($post);
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
        $data = $this->menu_level->delete($this->post());

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

