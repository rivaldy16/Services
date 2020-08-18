<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Skpd_aktif_model extends CI_Model {

    public function __construct(){
        parent::__construct();
    }

    public function get($start = null, $length = null, $sort = null, $order = null, $where = null, $like = null){
        $this->db->select('
            t_skpd_aktif.id_skpd_aktif as id_skpd_aktif,
            t_skpd_aktif.tahun as tahun,
            m_kode_skpd.id_kode_skpd as id_kode_skpd,
            m_kode_skpd.kode_skpd as kode_skpd,
            m_skpd.id_skpd as id_skpd,
            m_skpd.nama_lengkap as nama_lengkap_skpd,
            m_skpd.nama_singkat as nama_singkat_skpd,
            m_unor.id_unor as id_unor,
            m_unor.kode_unor as kode_unor
        ');
        $this->db->from('t_skpd_aktif');
        $this->db->join('m_kode_skpd', 't_skpd_aktif.id_kode_skpd = m_kode_skpd.id_kode_skpd');
        $this->db->join('m_skpd', 't_skpd_aktif.id_skpd = m_skpd.id_skpd');
        $this->db->join('m_unor', 't_skpd_aktif.id_unor = m_unor.id_unor');

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
        $this->db->insert('t_skpd_aktif', $data);
        return $this->db->insert_id();
    }

    public function update($where, $data) {
        $this->db->update('t_skpd_aktif', $data, $where);
        return $this->db->affected_rows();
    }

    public function delete($post) {
        $this->db->where($post);
        $this->db->delete('t_skpd_aktif');
        return $this->db->affected_rows();
    }
}
