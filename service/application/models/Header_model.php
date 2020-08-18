<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Header_model extends CI_Model {

    public function __construct(){
        parent::__construct();
    }

    public function get($start = null, $length = null, $sort = null, $order = null, $where = null, $like = null){
        $this->db->select('
            t_prokeg_skpd.id_prokeg_skpd as id_prokeg_skpd,
            t_prokeg_skpd.id_parent as id_parent,
            t_prokeg_skpd.kode_path as kode_path,
            t_prokeg_skpd.tahun as tahun,
            m_skpd.id_skpd as id_skpd,
            m_skpd.nama_lengkap as nama_lengkap_skpd,
            m_skpd.nama_singkat as nama_singkat_skpd,
            m_prokeg.id_prokeg as id_prokeg,
            m_prokeg.id_prokeg_jenis as id_prokeg_jenis,
            m_prokeg.uraian as uraian_prokeg,
            m_prokeg.kode as kode_prokeg,
            m_tahap.id_tahap as id_tahap,
            m_tahap.tahap as tahap,
            m_tahap.jenis as jenis_tahap,
            m_tahap.uraian as uraian_tahap,
            t_header.id_header as id_header,
            t_header.lokasi as lokasi,
            t_header.sasaran_kegiatan as sasaran_kegiatan,
            m_sumber_dana.id_sumber_dana as id_sumber_dana,
            m_sumber_dana.sumber_dana as sumber_dana
        ');
        $this->db->from('t_prokeg_skpd');
        $this->db->join('m_prokeg', 't_prokeg_skpd.id_prokeg = m_prokeg.id_prokeg');
        $this->db->join('m_skpd', 't_prokeg_skpd.id_skpd = m_skpd.id_skpd');
        $this->db->join('m_tahap', 't_prokeg_skpd.id_tahap = m_tahap.id_tahap');
        $this->db->join('t_header', 't_prokeg_skpd.id_prokeg_skpd = t_header.id_prokeg_skpd', 'LEFT');
        $this->db->join('m_sumber_dana', 't_header.id_sumber_dana = m_sumber_dana.id_sumber_dana', 'LEFT');

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
        $this->db->insert('t_header', $data);
        return $this->db->insert_id();
    }

    public function update($where, $data) {
        $this->db->update('t_header', $data, $where);
        return $this->db->affected_rows();
    }

    public function delete($post) {
        $this->db->where($post);
        $this->db->delete('t_header');
        return $this->db->affected_rows();
    }
}
