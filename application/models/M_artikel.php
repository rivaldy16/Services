<?php
defined('BASEPATH') or exit('No direct script access allowed');

class M_artikel extends CI_model
{
	var $column_order = array(null, 'judul');
	var $column_search = array('judul'); 
	var $order = array('id' => 'desc');

	var $column_order_kategori = array(null, 'judul');
	var $column_search_kategori = array('judul'); 
	var $order_kategori = array('id_kategori' => 'desc');

	var $column_order_kategori_maps = array(null, 'category');
	var $column_search_kategori_maps = array('category'); 
	var $order_kategori_maps = array('id' => 'desc');

	var $column_order_laporan	= array(null,'kegiatan_laporan.judul_kegiatan_laporan','kegiatan_laporan.date','kegiatan.nama_kegiatan');
	var $column_search_laporan	= array('kegiatan_laporan.judul_kegiatan_laporan','kegiatan_laporan.date','kegiatan.nama_kegiatan');
	var $order_laporan 			= array('kegiatan_laporan.id_kegiatan_laporan' => 'desc');

	var $column_order_pengumuman = array(null, 'judul_pengumuman');
	var $column_search_pengumuman = array('judul_pengumuman'); 
	var $order_pengumuman = array('id_pengumuman' => 'desc');

	var $column_order_slider = array(null, 'judul_slider');
	var $column_search_slider = array('judul_slider'); 
	var $order_slider = array('id_slider' => 'desc');

	var $column_order_location = array(null, 'location_name');
	var $column_search_location = array('location_name'); 
	var $order_location = array('id' => 'desc');


	private function _get_datatables_query($type=null,$id=null)
	{         
		switch ($type) {
			case 'artikel':
			case 'artikel_del':
				$this->db->select('*');
				$this->db->from('artikel');
			break;

			case 'kategori':
			case 'kategori_del':
				$this->db->select('*');
				$this->db->from('kategori');
			break;

			case 'location':
			case 'location_del':
				$this->db->select('*');
				$this->db->from('tb_location');
			break;

			case 'kategori_maps':
			case 'kategori_maps_del':
				$this->db->select('*');
				$this->db->from('tb_categories');
			break;

			case 'laporan':
			case 'laporan_del':
				$this->db->select('kegiatan_laporan.*, kegiatan.nama_kegiatan');
				$this->db->from('kegiatan_laporan');
				$this->db->join('kegiatan','kegiatan_laporan.id_kegiatan = kegiatan.id_kegiatan');
			break;

			case 'pengumuman':
			case 'pengumuman_del':
				$this->db->select('*');
				$this->db->from('pengumuman');
			break;

			case 'slider':
			case 'slider_del':
				$this->db->select('*');
				$this->db->from('slider');
			break;

			default:
			break;
		}

		$i = 0;
		switch ($type) {
			case 'slider':
			case 'slider_del':
				foreach ($this->column_search_slider as $item)
				{
					if (isset($_POST['search'])) {
						if($_POST['search']['value'])
						{                     
							if($i===0)
							{
								$this->db->group_start();
								$this->db->like($item, $_POST['search']['value']);
							}
							else
							{
								$this->db->or_like($item, $_POST['search']['value']);
							}

							if(count($this->column_search_slider) - 1 == $i)
								$this->db->group_end();
						}
						$i++;
					}
				}

				if (!isset($order_req)) {
					if(isset($_POST['order']))
					{
						$this->db->order_by($this->column_order_slider[$_POST['order']['0']['column']], $_POST['order']['0']['dir']);
					} 
					else if(isset($this->order_slider))
					{
						$order = $this->order_slider;
						$this->db->order_by(key($order), $order[key($order)]);
					}
				}  
			break;

			case 'kategori':
			case 'kategori_del':
				foreach ($this->column_search_kategori as $item)
				{
					if (isset($_POST['search'])) {
						if($_POST['search']['value'])
						{                     
							if($i===0)
							{
								$this->db->group_start();
								$this->db->like($item, $_POST['search']['value']);
							}
							else
							{
								$this->db->or_like($item, $_POST['search']['value']);
							}

							if(count($this->column_search_kategori) - 1 == $i)
								$this->db->group_end();
						}
						$i++;
					}
				}

				if (!isset($order_req)) {
					if(isset($_POST['order']))
					{
						$this->db->order_by($this->column_order_kategori[$_POST['order']['0']['column']], $_POST['order']['0']['dir']);
					} 
					else if(isset($this->order_kategori))
					{
						$order = $this->order_kategori;
						$this->db->order_by(key($order), $order[key($order)]);
					}
				}  
			break;

			case 'location':
			case 'location_del':
				foreach ($this->column_search_location as $item)
				{
					if (isset($_POST['search'])) {
						if($_POST['search']['value'])
						{                     
							if($i===0)
							{
								$this->db->group_start();
								$this->db->like($item, $_POST['search']['value']);
							}
							else
							{
								$this->db->or_like($item, $_POST['search']['value']);
							}

							if(count($this->column_search_location) - 1 == $i)
								$this->db->group_end();
						}
						$i++;
					}
				}

				if (!isset($order_req)) {
					if(isset($_POST['order']))
					{
						$this->db->order_by($this->column_order_location[$_POST['order']['0']['column']], $_POST['order']['0']['dir']);
					} 
					else if(isset($this->order_location))
					{
						$order = $this->order_location;
						$this->db->order_by(key($order), $order[key($order)]);
					}
				}  
			break;

			case 'kategori_maps':
			case 'kategori_maps_del':
				foreach ($this->column_search_kategori_maps as $item)
				{
					if (isset($_POST['search'])) {
						if($_POST['search']['value'])
						{                     
							if($i===0)
							{
								$this->db->group_start();
								$this->db->like($item, $_POST['search']['value']);
							}
							else
							{
								$this->db->or_like($item, $_POST['search']['value']);
							}

							if(count($this->column_search_kategori_maps) - 1 == $i)
								$this->db->group_end();
						}
						$i++;
					}
				}

				if (!isset($order_req)) {
					if(isset($_POST['order']))
					{
						$this->db->order_by($this->column_order_kategori_maps[$_POST['order']['0']['column']], $_POST['order']['0']['dir']);
					} 
					else if(isset($this->order_kategori_maps))
					{
						$order = $this->order_kategori_maps;
						$this->db->order_by(key($order), $order[key($order)]);
					}
				}  
			break;

			case 'laporan':
			case 'laporan_del':
				foreach ($this->column_search_laporan as $item)
				{
					if (isset($_POST['search'])) {
						if($_POST['search']['value'])
						{                     
							if($i===0)
							{
								$this->db->group_start();
								$this->db->like($item, $_POST['search']['value']);
							}
							else
							{
								$this->db->or_like($item, $_POST['search']['value']);
							}

							if(count($this->column_search_laporan) - 1 == $i)
								$this->db->group_end();
						}
						$i++;
					}
				}

				if (!isset($order_req)) {
					if(isset($_POST['order']))
					{
						$this->db->order_by($this->column_order_laporan[$_POST['order']['0']['column']], $_POST['order']['0']['dir']);
					} 
					else if(isset($this->order_laporan))
					{
						$order = $this->order_laporan;
						$this->db->order_by(key($order), $order[key($order)]);
					}
				}  
			break;

			case 'pengumuman':
			case 'pengumuman_del':
				foreach ($this->column_search_pengumuman as $item)
				{
					if (isset($_POST['search'])) {
						if($_POST['search']['value'])
						{                     
							if($i===0)
							{
								$this->db->group_start();
								$this->db->like($item, $_POST['search']['value']);
							}
							else
							{
								$this->db->or_like($item, $_POST['search']['value']);
							}

							if(count($this->column_search_pengumuman) - 1 == $i)
								$this->db->group_end();
						}
						$i++;
					}
				}

				if (!isset($order_req)) {
					if(isset($_POST['order']))
					{
						$this->db->order_by($this->column_order_pengumuman[$_POST['order']['0']['column']], $_POST['order']['0']['dir']);
					} 
					else if(isset($this->order_pengumuman))
					{
						$order = $this->order_pengumuman;
						$this->db->order_by(key($order), $order[key($order)]);
					}
				}  
			break;
			
			default:
				foreach ($this->column_search as $item)
				{
					if (isset($_POST['search'])) {
						if($_POST['search']['value'])
						{                     
							if($i===0)
							{
								$this->db->group_start();
								$this->db->like($item, $_POST['search']['value']);
							}
							else
							{
								$this->db->or_like($item, $_POST['search']['value']);
							}

							if(count($this->column_search) - 1 == $i)
								$this->db->group_end();
						}
						$i++;
					}
				}

				if (!isset($order_req)) {
					if(isset($_POST['order']))
					{
						$this->db->order_by($this->column_order[$_POST['order']['0']['column']], $_POST['order']['0']['dir']);
					} 
					else if(isset($this->order))
					{
						$order = $this->order;
						$this->db->order_by(key($order), $order[key($order)]);
					}
				}  
			break;
		}
	}

	function get_datatables($type=null,$id=null)
	{
		$this->_get_datatables_query($type);

		switch ($type) {
			case 'artikel':
			$this->db->where('artikel.status',1);
			break;
			case 'artikel_del':
			$this->db->where('artikel.status',0);
			break;
			case 'kategori':
			case 'kategori_maps':
			case 'pengumuman':
			case 'slider':
			case 'location':
			$this->db->where('status',1);
			break;
			case 'slider_del':
			case 'pengumuman_del':
			case 'kategori_del':
			case 'kategori_maps_del':
			case 'location_del':
			$this->db->where('status',0);
			break;
			case 'laporan':
			$this->db->where('kegiatan_laporan.status',1);
			break;
			case 'laporan_del':
			$this->db->where('kegiatan_laporan.status',0);
			break;

			default:
                # code...
			break;
		}

		if($_POST['length'] != -1){
			$this->db->limit($_POST['length'], $_POST['start']);
		}
		$query = $this->db->get();
		return $query->result();
	}

	function count_filtered($type=null,$id=null)
	{
		$this->_get_datatables_query($type);

		switch ($type) {
			case 'artikel':
			$this->db->where('artikel.status',1);
			break;
			case 'artikel_del':
			$this->db->where('artikel.status',0);
			break;
			case 'kategori':
			case 'kategori_maps':
			case 'pengumuman':
			case 'slider':
			case 'location':
			$this->db->where('status',1);
			break;
			case 'slider_del':
			case 'pengumuman_del':
			case 'kategori_del':
			case 'kategori_maps_del':
			case 'location_del':
			$this->db->where('status',0);
			break;
			case 'laporan':
			$this->db->where('kegiatan_laporan.status',1);
			break;
			case 'laporan_del':
			$this->db->where('kegiatan_laporan.status',0);
			break;
			default:
                # code...
			break;
		}

		$query = $this->db->get();
		return $query->num_rows();
	}

	public function count_all($type=null,$id=null)
	{
		$this->_get_datatables_query($type);

		switch ($type) {
			case 'artikel':
			$this->db->where('artikel.status',1);
			break;
			case 'artikel_del':
			$this->db->where('artikel.status',0);
			break;
			case 'kategori':
			case 'kategori_maps':
			case 'pengumuman':
			case 'slider':
			case 'location':
			$this->db->where('status',1);
			break;
			case 'slider_del':
			case 'pengumuman_del':
			case 'kategori_del':
			case 'kategori_maps_del':
			case 'location_del':
			$this->db->where('status',0);
			break;
			case 'laporan':
			$this->db->where('kegiatan_laporan.status',1);
			break;
			case 'laporan_del':
			$this->db->where('kegiatan_laporan.status',0);
			break;

			default:
                # code...
			break;
		}

		return $this->db->count_all_results();
	}

}
