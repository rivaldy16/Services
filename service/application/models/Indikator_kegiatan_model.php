<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Indikator_kegiatan_model extends CI_Model {

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
            (SELECT count(*) FROM t_indikator_kegiatan WHERE id_prokeg_skpd = t_prokeg_skpd.id_prokeg_skpd) as jumlah
        ');
        $this->db->from('t_prokeg_skpd');
        $this->db->join('m_prokeg', 't_prokeg_skpd.id_prokeg = m_prokeg.id_prokeg');
        $this->db->join('m_skpd', 't_prokeg_skpd.id_skpd = m_skpd.id_skpd');
        $this->db->join('m_tahap', 't_prokeg_skpd.id_tahap = m_tahap.id_tahap');

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

    public function get_data_indikator($where = null, $like = null){
        $this->db->select('
            t_indikator_kegiatan.id_indikator_kegiatan as id_indikator_kegiatan,
            t_indikator_kegiatan.id_prokeg_skpd as id_prokeg_skpd,
            t_indikator_kegiatan.tolak_ukur as tolak_ukur,
            t_indikator_kegiatan.target as target,
            m_indikator.id_indikator as id_indikator,
            m_indikator.indikator as indikator
        ');
        $this->db->from('t_indikator_kegiatan');
        $this->db->join('m_indikator', 't_indikator_kegiatan.id_indikator = m_indikator.id_indikator');

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
        $this->db->insert('t_indikator_kegiatan', $data);
        return $this->db->insert_id();
    }

    public function update($where, $data) {
        $this->db->update('t_indikator_kegiatan', $data, $where);
        return $this->db->affected_rows();
    }

    public function delete($post) {
        $this->db->where($post);
        $this->db->delete('t_indikator_kegiatan');
        return $this->db->affected_rows();
    }
}
