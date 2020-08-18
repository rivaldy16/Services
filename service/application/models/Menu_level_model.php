<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Menu_level_model extends CI_Model {

    public function __construct(){
        parent::__construct();
    }

    public function get($start = null, $length = null, $sort = null, $order = null, $where = null, $like = null){
        $this->db->select('
            t_menu_level.id_menu_level as id_menu_level,
            m_menu.id_menu as id_menu,
            m_menu.id_parent as id_parent,
            m_menu.nama as nama,
            m_menu.index as index,
            m_menu.path as path,
            m_menu.icon as icon,
            m_level.id_level as id_level,
            m_level.nama as nama_level,
            m_level.deskripsi as deskripsi_level
        ');
        $this->db->from('t_menu_level');
        $this->db->join('m_menu', 't_menu_level.id_menu = m_menu.id_menu');
        $this->db->join('m_level', 't_menu_level.id_level = m_level.id_level');
        if($start != null && $length != null){
            $this->db->limit($length, $start);
        }
        if($sort != null && $order != null){
            $this->db->order_by($sort, $order);
        }
        if($where != null){
            $this->db->where($where);
        }
        if($like != null){
            $this->db->like($like);
        }
        $query = $this->db->get();
        return $query->result();
    }

    public function insert($data) {
        $this->db->insert('t_menu_level', $data);
        return $this->db->insert_id();
    }

    public function update($where, $data) {
        $this->db->update('t_menu_level', $data, $where);
        return $this->db->affected_rows();
    }

    public function delete($post) {
        $this->db->where($post);
        $this->db->delete('t_menu_level');
        return $this->db->affected_rows();
    }
}
