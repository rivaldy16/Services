<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Prokeg_model extends CI_Model {

    public function __construct(){
        parent::__construct();
    }

    public function get($start = null, $length = null, $sort = null, $order = null, $where = null, $like = null){
        $this->db->select('
            m_prokeg.id_prokeg as id_prokeg,
            m_prokeg.id_parent as id_parent,
            m_prokeg.id_prokeg_jenis as id_prokeg_jenis,
            m_prokeg.id_tahap as id_tahap,
            m_prokeg.uraian as uraian,
            m_prokeg.kode as kode,
            m_prokeg.kode_path as kode_path,
            m_prokeg.tahun as tahun,
            m_prokeg_jenis.id_parent as id_parent_prokeg_jenis,
            m_prokeg_jenis.uraian as uraian_prokeg_jenis,
            m_tahap.tahap as tahap,
            m_tahap.uraian as uraian_tahap
        ');
        $this->db->from('m_prokeg');
        $this->db->join('m_prokeg_jenis', 'm_prokeg.id_prokeg_jenis = m_prokeg_jenis.id_prokeg_jenis');
        $this->db->join('m_tahap', 'm_prokeg.id_tahap = m_tahap.id_tahap');
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
        $this->db->insert('m_prokeg', $data);
        return $this->db->insert_id();
    }

    public function update($where, $data) {
        $this->db->update('m_prokeg', $data, $where);
        return $this->db->affected_rows();
    }

    public function delete($post) {
        $this->db->where($post);
        $this->db->delete('m_prokeg');
        return $this->db->affected_rows();
    }
}
