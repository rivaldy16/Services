<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Masa_input_model extends CI_Model {

    public function __construct(){
        parent::__construct();
    }

    public function get($start = null, $length = null, $sort = null, $order = null, $where = null, $like = null){
        $this->db->select('
            m_masa_input.id_masa_input as id_masa_input,
            m_masa_input.tahun as tahun,
            m_tahap.id_tahap as id_tahap,
            m_tahap.tahap as tahap,
            m_tahap.jenis as jenis_tahap,
            m_tahap.uraian as uraian_tahap
        ');
        $this->db->from('m_masa_input');
        $this->db->join('m_tahap', 'm_masa_input.id_tahap = m_tahap.id_tahap');
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

    public function update($where, $data) {
        $this->db->update('m_masa_input', $data, $where);
        return $this->db->affected_rows();
    }
}
