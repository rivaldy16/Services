<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Beranda extends MX_Controller 
{

	public function __construct()
	{
		parent::__construct();
        isLogin(); 
	}

	public function index()
	{
		$this->data = array(
			'title_page'	=> 'Profil Desa Kranggan',
			'active'		=> 'beranda',
			'header'		=> 'Beranda',
			'content'		=> 'home',
		);
		$this->load->view('layout',$this->data);
	}

	public function home()
	{
		$this->data = array(
			'header'		=> 'Beranda',
		);
		$this->load->view('home',$this->data);
	}

	public function kategori()
	{
		$this->data = array(
			'header'		=> 'Management Kategori Menu',
		);
		$this->load->view('kategori',$this->data);
	}

	public function kategori_maps()
	{
		$this->data = array(
			'header'		=> 'Management Kategori Maps',
		);
		$this->load->view('kategori_maps',$this->data);
	}

	public function pengumuman()
	{
		$this->data = array(
			'header'		=> 'Pengumuman',
		);
		$this->load->view('pengumuman',$this->data);
	}

	public function slider()
	{
		$this->data = array(
			'header'		=> 'Management Banner',
		);
		$this->load->view('slider',$this->data);
	}

	public function artikel()
	{
		$items				= $this->m_frontend->getMenu();
		$this->data = array(
			'header'		=> 'Management Artikel',
			'kategori'		=> get_kategori($items),
		);
		$this->load->view('artikel',$this->data);
	}

	public function location()
	{
		$this->data = array(
			'header'		=> 'Management Lokasi',
			'kategori'		=> $this->m_frontend->get_category_location(),
		);
		$this->load->view('location',$this->data);
	}

	public function laporan()
	{
		$this->data = array(
			'header'		=> 'Laporan Management',
			'kegiatan' 		=> kegiatan(),
		);
		$this->load->view('laporan',$this->data);
		/*
		$this->data = array(
			'title_page'	=> 'Management Laporan Kegiatan - Kelurahan',
			'active'		=> 'laporan',
			'header'		=> 'Management Laporan Kegiatan',
			'kegiatan' 		=> kegiatan(),
			'content' 		=> 'laporan'
		);
		$this->load->view('layout',$this->data);
		*/
	}

	public function menu()
	{
		$items				= $this->m_frontend->getMenu();
		$this->data = array(
			'header'		=> 'Menu Management',
			'menu'			=> get_menu($items),
		);
		$this->load->view('menu',$this->data);
	}

	


	public function user()
	{
		$this->data = array(
			'header'		=> 'User Management'
		);
		$this->load->view('user',$this->data);
	}

	public function ajax_edit()
	{
		$type = $_GET['type'];
		$id   = $_POST['id'];
		switch ($type) 
		{
			case 'artikel':
			$cek['table'] 	= 'artikel';
			$cek['where']	= 'id = '.$_POST['id'];
			$data = $this->m_frontend->getID($cek);
			break;

			case 'location':
			$cek['table'] 	= 'tb_location';
			$cek['where']	= 'id = '.$_POST['id'];
			$data = $this->m_frontend->getID($cek);
			break;

			case 'pengumuman':
			$cek['select'] 	= 'pengumuman.*,DATE(pengumuman.tanggal_pengumuman) as tanggal_pengumuman';
			$cek['table'] 	= 'pengumuman';
			$cek['where']	= 'id_pengumuman = '.$_POST['id'];
			$data = $this->m_frontend->getID($cek);
			break;

			case 'slider':
			$cek['select'] 	= 'slider.*';
			$cek['table'] 	= 'slider';
			$cek['where']	= 'id_slider = '.$_POST['id'];
			$data = $this->m_frontend->getID($cek);
			break;

			case 'kategori':
			$cek['table'] 	= 'kategori';
			$cek['where']	= 'id_kategori = '.$_POST['id'];
			$data = $this->m_frontend->getID($cek);
			break;

			case 'kategori_maps':
			$cek['table'] 	= 'tb_categories';
			$cek['where']	= 'id = '.$_POST['id'];
			$data = $this->m_frontend->getID($cek);
			break;


			case 'menu':

			$cek['table'] 	= 'menu';
			$cek['where']	= 'id = '.$id;
			$data = $this->m_frontend->getID($cek); 

			break;
			
			case 'user':
			$cek['table'] 	= 'user';
			$cek['where']	= 'id_user = '.$id;
			$data = $this->m_frontend->getID($cek);	
			break;

			case 'laporan':
			$cek['select']	= 'a.*,b.album_kegiatan_foto,b.deskripsi_kegiatan_foto,b.id_kegiatan_foto';
			$cek['table'] 	= 'kegiatan_laporan as a';
			$cek['join'][0]	= array('kegiatan_foto as b', 'a.id_kegiatan_laporan = b.id_kegiatan_laporan' );
			$cek['where']	= 'a.id_kegiatan_laporan = '.$id;
			$data = $this->m_frontend->getData($cek);	
			break;
			
			default:

			break;
		}

		echo json_encode($data);
	}

	public function ajax_save()
	{
		$type = $_GET['type'];
		$id_create = $_SESSION['id_user'];
		switch ($type) {
			case 'menu':
				$this->_validate();
				$copy['table'] 	= 'menu';
				$copy['where'] 	= "menu ='".$this->input->post('menu')."' AND link ='".$this->input->post('link')."'";
				$cek 			= $this->m_frontend->getID($copy);
				if(isset($cek->id))
				{
					echo json_encode(['success' => false, 'message' => 'Menu dan Link Tidak Boleh Sama','status' => TRUE]);
				}
				else
				{
					$data = array(
						'parent' 		=> 0,
						'menu'   		=> $this->input->post('menu'),
						'link'			=> $this->input->post('link'),
						'id_kategori'	=> $this->input->post('id_kategori'),
						'parent'		=> $this->input->post('parent'),
					);

					$insert = $this->m_frontend->insert('menu',$data);
					if (!$insert)
					{
						echo json_encode(['success' => false, 'message' => 'Gagal menyimpan data!','status' => TRUE]);
					}
					else 
					{
						echo json_encode(['success' => true, 'message' => 'Data berhasil disimpan','status' => TRUE]);
					}	
				}
			break;

			case 'user':
				$this->_validate();
				$data = array(
					'id_user_type'	=> $this->input->post('hak_akses'),
					'nip'   		=> $this->input->post('nip'),
					'nama'			=> $this->input->post('nama_pegawai'),
					'kode_unor'		=> $this->input->post('kode_unor'),
					'nama_odp'		=> $this->input->post('nama_odp'),
					'regis_date'	=> date('Y-m-d H:i:s'),
					'status'		=> '1'
				);
				$insert = $this->m_frontend->insert('user',$data);
				if (!$insert)
				{
					echo json_encode(['success' => false, 'message' => 'Gagal menyimpan data!','status' => TRUE]);
				}
				else 
				{
					echo json_encode(['success' => true, 'message' => 'Data berhasil disimpan','status' => TRUE]);
				}
			break;

			case 'artikel':
				$this->_validate();

				$config['upload_path'] = './assets/files/';
				$config['allowed_types'] = 'jpg|jpeg';
				$config['encrypt_name'] = TRUE;
				$config['overwrite'] = TRUE;
				$this->upload->initialize($config);

				if($this->upload->do_upload("imgInp"))
				{	
					$name = $this->upload->data();
					$name_foto  = $name['file_name'];
				}
				else
				{
					$name_foto = '';
				}

				$config2['upload_path'] = './assets/files/';
				$config2['allowed_types'] = 'pdf';
				$config2['encrypt_name'] = TRUE;
				$config2['overwrite'] = TRUE;
				$this->upload->initialize($config2);

				if($this->upload->do_upload("pdf"))
				{	
					$name = $this->upload->data();
					$name_file  = $name['file_name'];
				}
				else
				{
					$name_file = '';
				}

				$data = array(
					'foto' 			=> $name_foto,
					'file'			=> $name_file,
					'id_create' 	=> $id_create,
					'headline'		=> $_POST['headline'],
					'id_kategori'	=> $this->input->post('id_kategori'),
					'url'			=> $this->input->post('link'),
					'judul'			=> $this->input->post('judul'),
					'text'			=> $this->input->post('editor'),
					'date'			=> date('Y-m-d H:i:s'),
					'status'		=> '1',
				);
					
				$insert = $this->m_frontend->insert('artikel',$data);
				if (!$insert)
				{
					echo json_encode(['success' => false, 'message' => 'Gagal menyimpan data!','status' => TRUE]);
				}
				else 
				{
					echo json_encode(['success' => true, 'message' => 'Data berhasil disimpan','status' => TRUE]);
				}
				
			break;
			case 'pengumuman':
				$this->_validate();

				$config2['upload_path'] = './assets/files/pengumuman/';
				$config2['allowed_types'] = 'pdf';
				$config2['encrypt_name'] = TRUE;
				$config2['overwrite'] = TRUE;
				$this->upload->initialize($config2);

				if($this->upload->do_upload("pdf"))
				{	
					$name = $this->upload->data();
					$name_file  = $name['file_name'];
				}
				else
				{
					$name_file = '';
				}

				$data = array(
					'file_pengumuman'		=> $name_file,
					'id_create' 			=> $id_create,
					'judul_pengumuman'		=> $_POST['judul_pengumuman'],
					'tanggal_pengumuman'	=> $_POST['tanggal_pengumuman'],
					'skpd_pengumuman'		=> 'Kelurahan Manis Jaya',
					'status'				=> '1',
				);
					
				$insert = $this->m_frontend->insert('pengumuman',$data);
				if (!$insert)
				{
					echo json_encode(['success' => false, 'message' => 'Gagal menyimpan data!','status' => TRUE]);
				}
				else 
				{
					echo json_encode(['success' => true, 'message' => 'Data berhasil disimpan','status' => TRUE]);
				}
				
			break;
			case 'slider':
				$config['upload_path'] = './assets/files/slider/';
				$config['allowed_types'] = 'jpg|jpeg';
				$config['encrypt_name'] = TRUE;
				$config['overwrite'] = TRUE;
				$this->upload->initialize($config);

				if($this->upload->do_upload("imgInp"))
				{	
					$name = $this->upload->data();
					$name_foto  = $name['file_name'];
				}
				else
				{
					$name_foto = '';
				}

				$data = array(
					'images_slider'		=> $name_foto,
					'id_create' 		=> $id_create,
					'judul_slider'		=> $_POST['judul_slider'],
					'status'			=> '1',
				);
					
				$insert = $this->m_frontend->insert('slider',$data);
				if (!$insert)
				{
					echo json_encode(['success' => false, 'message' => 'Gagal menyimpan data!','status' => TRUE]);
				}
				else 
				{
					echo json_encode(['success' => true, 'message' => 'Data berhasil disimpan','status' => TRUE]);
				}
				
			break;
			case 'location':
				$this->_validate();
				$config['upload_path'] = './assets/files/';
				$config['allowed_types'] = 'jpg|jpeg';
				$config['encrypt_name'] = TRUE;
				$config['overwrite'] = TRUE;
				$this->upload->initialize($config);

				if($this->upload->do_upload("imgInp"))
				{	
					$name = $this->upload->data();
					$name_foto  = $name['file_name'];
				}
				else
				{
					$name_foto = '';
				}

				$config2['upload_path'] = './assets/files/';
				$config2['allowed_types'] = 'pdf';
				$config2['encrypt_name'] = TRUE;
				$config2['overwrite'] = TRUE;
				$this->upload->initialize($config2);

				if($this->upload->do_upload("imgInp1"))
				{	
					$name1 = $this->upload->data();
					$name_file  = $name1['file_name'];
				}
				else
				{
					$name_file = '';
				}

				$data = array(
					'created_by' 	=> $id_create,
					'id_category'	=> $this->input->post('id_category'),
					'location_name'	=> $this->input->post('location_name'),
					'longitude'		=> $this->input->post('longitude'),
					'latitude'		=> $this->input->post('latitude'),
					'description'	=> $this->input->post('description'),
					'status'		=> '1',
					'image'		=> $name_foto,
					'file'		=> $name_file
				);

				$insert = $this->m_frontend->insert('tb_location',$data);
				if (!$insert)
				{
					echo json_encode(['success' => false, 'message' => 'Gagal menyimpan data!','status' => TRUE]);
				}
				else 
				{
					echo json_encode(['success' => true, 'message' => 'Data berhasil disimpan','status' => TRUE]);
				}	
			break;
			case 'kategori':
				$this->_validate();
				$data = array(
					'id_create' => $id_create,
					'judul'		=> $this->input->post('judul_kategori'),
					'date'		=> date('Y-m-d H:i:s'),
					'status'	=> '1',
				);

				$insert = $this->m_frontend->insert('kategori',$data);
				if (!$insert)
				{
					echo json_encode(['success' => false, 'message' => 'Gagal menyimpan data!','status' => TRUE]);
				}
				else 
				{
					echo json_encode(['success' => true, 'message' => 'Data berhasil disimpan','status' => TRUE]);
				}	
			break;
			case 'kategori_maps':
				$this->_validate();
				$data = array(
					'category'	=> $this->input->post('judul_kategori'),
					'status'	=> '1',
				);

				$insert = $this->m_frontend->insert('tb_categories',$data);
				if (!$insert)
				{
					echo json_encode(['success' => false, 'message' => 'Gagal menyimpan data!','status' => TRUE]);
				}
				else 
				{
					echo json_encode(['success' => true, 'message' => 'Data berhasil disimpan','status' => TRUE]);
				}	
			break;
			case  'laporan':
				$kegiatan = array(
					'judul_kegiatan_laporan'	=> $this->input->post('judul_kegiatan'),
					'date'						=> date('Y-m-d H:i:s'),
					'id_create' 				=> $id_create,
					'status'					=> '1',
				);
				$id_kegiatan_laporan = $this->m_frontend->insert_id('kegiatan_laporan',$kegiatan);
				foreach ($this->input->post('file') as $key => $value) {
					$data = array(
						'id_kegiatan_laporan'		=> $id_kegiatan_laporan,
						'album_kegiatan_foto' 		=> $_POST['file'][$key],
						'deskripsi_kegiatan_foto'	=> $_POST['deskripsi'][$key],
						'status'					=> '1'
					);
					$insert = $this->m_frontend->insert('kegiatan_foto',$data);
				}
				if (!$insert)
				{
					echo json_encode(['success' => false, 'message' => 'Gagal menyimpan data!','status' => TRUE]);
				}
				else 
				{
					echo json_encode(['success' => true, 'message' => 'Data berhasil disimpan','status' => TRUE]);
				}	
			break;

			default:

			break;
		}
	}

	public function ajax_ubah()
	{
		$type 		= $_GET['type'];
		$id_create 	= $_SESSION['id_user'];
		switch ($type) {
			case 'slider':
				$this->_validate();

				$config['upload_path'] = './assets/files/slider/';
				$config['allowed_types'] = 'jpg|jpeg';
				$config['encrypt_name'] = TRUE;
				$config['overwrite'] = TRUE;
				$this->upload->initialize($config);

				if($this->upload->do_upload("imgInp"))
				{	
					$name = $this->upload->data();
					$name_foto  = $name['file_name'];
				}
				else
				{
					$name_foto = $_POST['file'];
				}

				$data = array(
					'images_slider'		=> $name_foto,
					'id_create' 		=> $id_create,
					'judul_slider'		=> $_POST['judul_slider'],
					'status'			=> '1',
				);
					
				$insert = $this->m_frontend->update('slider',array('id_slider' => $this->input->post('id')), $data);
				if (!$insert)
				{
					echo json_encode(['success' => false, 'message' => 'Gagal menyimpan data!','status' => TRUE]);
				}
				else 
				{
					echo json_encode(['success' => true, 'message' => 'Data berhasil disimpan','status' => TRUE]);
				}
				
			break;
			case 'menu':
				$this->_validate();
				$data 	= array(
					'menu'   		=> $this->input->post('menu'),
					'link'			=> $this->input->post('link'),
					'id_kategori' 	=> $this->input->post('id_kategori'),
					'parent'		=> $this->input->post('parent'),
				);

				$insert = $this->m_frontend->update('menu',array('id' => $this->input->post('id')), $data);
				if (!$insert)
				{
					echo json_encode(['success' => false, 'message' => 'Data Gagal Di Ubah','status' => TRUE]);
				}
				else 
				{
					echo json_encode(['success' => true, 'message' => 'Data Berhasil Di Ubah','status' => TRUE]);
				}
			break;

			case 'user':
				$this->_validate();
				$data = array(
					'id_user_type'	=> $this->input->post('hak_akses'),
					'nip'   		=> $this->input->post('nip'),
					'nama'			=> $this->input->post('nama_pegawai'),
					'kode_unor'		=> $this->input->post('kode_unor'),
					'nama_odp'		=> $this->input->post('nama_odp'),
					'regis_date'	=> date('Y-m-d H:i:s'),
					'status'		=> '1'
				);
				$insert = $this->m_frontend->update('user',array('id_user' => $this->input->post('id')), $data);
				if (!$insert)
				{
					echo json_encode(['success' => false, 'message' => 'Data Gagal Di Ubah','status' => TRUE]);
				}
				else 
				{
					echo json_encode(['success' => true, 'message' => 'Data Berhasil Di Ubah','status' => TRUE]);
				}
			break;

			case 'artikel':
				$this->_validate();

				$config['upload_path'] = './assets/files/';
				$config['allowed_types'] = 'jpg|jpeg';
				$config['encrypt_name'] = TRUE;
				$config['overwrite'] = TRUE;
				$this->upload->initialize($config);

				if($this->upload->do_upload("imgInp"))
				{	
					$name = $this->upload->data();
					$name_foto  = $name['file_name'];
				}
				else
				{
					if(!empty($_POST['foto']))
					{
						$name_foto = $_POST['foto'];
					}
					else
					{
						$name_foto = '';
					}
					
				}

				$config2['upload_path'] = './assets/files/';
				$config2['allowed_types'] = 'pdf';
				$config2['encrypt_name'] = TRUE;
				$config2['overwrite'] = TRUE;
				$this->upload->initialize($config2);

				if($this->upload->do_upload("pdf"))
				{	
					$name = $this->upload->data();
					$name_file  = $name['file_name'];
				}
				else
				{
					if(!empty($_POST['pdf']))
					{
						$name_file = $_POST['pdf'];
					}
					else
					{
						$name_file = '';
					}
				}

				$data = array(
					'foto' 			=> $name_foto,
					'file'			=> $name_file,
					'id_create' 	=> $id_create,
					'headline'		=> $_POST['headline'],
					'id_kategori'	=> $this->input->post('id_kategori'),
					'url'			=> $this->input->post('link'),
					'judul'			=> $this->input->post('judul'),
					'text'			=> $this->input->post('editor'),
					'date'			=> date('Y-m-d H:i:s'),
					'status'		=> '1',
				);
					
				$insert = $this->m_frontend->update('artikel',array('id' => $this->input->post('id')), $data);
				if (!$insert)
				{
					echo json_encode(['success' => false, 'message' => 'Data Gagal Di Ubah','status' => TRUE]);
				}
				else 
				{
					echo json_encode(['success' => true, 'message' => 'Data Berhasil Di Ubah','status' => TRUE]);
				}	
			break;

			case 'location':
				$this->_validate();
				$config['upload_path'] = './assets/files/';
				$config['allowed_types'] = 'jpg|jpeg';
				$config['encrypt_name'] = TRUE;
				$config['overwrite'] = TRUE;
				$this->upload->initialize($config);

				if($this->upload->do_upload("imgInp"))
				{	
					$name = $this->upload->data();
					$name_foto  = $name['file_name'];
				}
				else
				{
					$name_foto = $_POST['file'];
				}

				$config2['upload_path'] = './assets/files/';
				$config2['allowed_types'] = 'pdf';
				$config2['encrypt_name'] = TRUE;
				$config2['overwrite'] = TRUE;
				$this->upload->initialize($config2);

				if($this->upload->do_upload("imgInp1"))
				{	
					$name1 = $this->upload->data();
					$name_file  = $name1['file_name'];
				}
				else
				{
					$name_file = '';
				}

				$data = array(
					'created_by' 	=> $id_create,
					'id_category'	=> $this->input->post('id_category'),
					'location_name'	=> $this->input->post('location_name'),
					'longitude'		=> $this->input->post('longitude'),
					'latitude'		=> $this->input->post('latitude'),
					'description'	=> $this->input->post('description'),
					'status'		=> '1',
					'image'		=> $name_foto,
					'file'		=> $name_file
				);

				$insert = $this->m_frontend->update('tb_location',array('id' => $this->input->post('id')), $data);
				if (!$insert)
				{
					echo json_encode(['success' => false, 'message' => 'Gagal menyimpan data!','status' => TRUE]);
				}
				else 
				{
					echo json_encode(['success' => true, 'message' => 'Data berhasil disimpan','status' => TRUE]);
				}	
			break;

			case 'kategori':
				$this->_validate();
				$data = array(
					'id_create' => $id_create,
					'judul'		=> $this->input->post('judul_kategori'),
					'date'		=> date('Y-m-d H:i:s'),
					'status'	=> '1',
				);

				$insert = $this->m_frontend->update('kategori',array('id_kategori' => $this->input->post('id')), $data);
				if (!$insert)
				{
					echo json_encode(['success' => false, 'message' => 'Gagal menyimpan data!','status' => TRUE]);
				}
				else 
				{
					echo json_encode(['success' => true, 'message' => 'Data berhasil disimpan','status' => TRUE]);
				}	
			break;

			case 'kategori_maps':
				$this->_validate();
				$data = array(
					'category'	=> $this->input->post('judul_kategori'),
					'status'	=> '1',
				);

				$insert = $this->m_frontend->update('tb_categories',array('id' => $this->input->post('id')), $data);
				if (!$insert)
				{
					echo json_encode(['success' => false, 'message' => 'Gagal menyimpan data!','status' => TRUE]);
				}
				else 
				{
					echo json_encode(['success' => true, 'message' => 'Data berhasil disimpan','status' => TRUE]);
				}	
			break;

			case  'laporan':
				$kegiatan = array(
					'judul_kegiatan_laporan'	=> $this->input->post('judul_kegiatan'),
					'date'						=> date('Y-m-d H:i:s'),
					'id_create' 				=> $id_create,
					'status'					=> '1',
				);
				$insert = $this->m_frontend->update('kegiatan_laporan',array('id_kegiatan_laporan' => $this->input->post('id')),$kegiatan);
				if(isset($_POST['file']))
				{
					foreach ($this->input->post('file') as $key => $value) {
						$data = array(
							'id_kegiatan_laporan'		=> $this->input->post('id'),
							'album_kegiatan_foto' 		=> $_POST['file'][$key],
							'deskripsi_kegiatan_foto'	=> $_POST['deskripsi'][$key],
							'status'					=> '1'
						);
						$insert = $this->m_frontend->insert('kegiatan_foto',$data);
					}
				}
				if (!$insert)
				{
					echo json_encode(['success' => false, 'message' => 'Gagal menyimpan data!','status' => TRUE]);
				}
				else 
				{
					echo json_encode(['success' => true, 'message' => 'Data berhasil disimpan','status' => TRUE]);
				}	
			break;
			
			default:

			break;
		}
	}

	public function ajax_hapus()
	{
		$type = $_GET['type'];
		switch ($type) {
			case 'menu':
				$hapus 	= $this->m_frontend->delete('menu',array('id'=> $this->input->post('id')));
				if (!$hapus)
				{
					echo json_encode(['success' => false, 'message' => 'Data Gagal Di Hapus']);
				}
				else 
				{
					echo json_encode(['success' => true, 'message' => 'Data Berhasil Di Hapus']);
				}
			break;
			case 'user':
				$data = array(
					'status'	=> '0'
				);
				$hapus = $this->m_frontend->update('user',array('id_user' => $this->input->post('id')), $data);

				if (!$hapus)
				{
					echo json_encode(['success' => false, 'message' => 'Data Gagal Di Hapus']);
				}
				else 
				{
					echo json_encode(['success' => true, 'message' => 'Data Berhasil Di Hapus']);
				}
			break;

			case 'artikel':
				$data = array(
					'status'	=> '0'
				);
				$hapus = $this->m_frontend->update('artikel',array('id' => $this->input->post('id')), $data);

				if (!$hapus)
				{
					echo json_encode(['success' => false, 'message' => 'Data Gagal Di Hapus']);
				}
				else 
				{
					echo json_encode(['success' => true, 'message' => 'Data Berhasil Di Hapus']);
				}	
			break;

			case 'location':
				$data = array(
					'status'	=> '0'
				);
				$hapus = $this->m_frontend->update('tb_location',array('id' => $this->input->post('id')), $data);

				if (!$hapus)
				{
					echo json_encode(['success' => false, 'message' => 'Data Gagal Di Hapus']);
				}
				else 
				{
					echo json_encode(['success' => true, 'message' => 'Data Berhasil Di Hapus']);
				}	
			break;

			case 'kategori':
				$data = array(
					'status'	=> '0'
				);
				$hapus = $this->m_frontend->update('kategori',array('id_kategori' => $this->input->post('id')), $data);

				if (!$hapus)
				{
					echo json_encode(['success' => false, 'message' => 'Data Gagal Di Hapus']);
				}
				else 
				{
					echo json_encode(['success' => true, 'message' => 'Data Berhasil Di Hapus']);
				}	
			break;
			case 'kategori_maps':
				$data = array(
					'status'	=> '0'
				);
				$hapus = $this->m_frontend->update('tb_categories',array('id' => $this->input->post('id')), $data);

				if (!$hapus)
				{
					echo json_encode(['success' => false, 'message' => 'Data Gagal Di Hapus']);
				}
				else 
				{
					echo json_encode(['success' => true, 'message' => 'Data Berhasil Di Hapus']);
				}	
			break;
			case 'laporan':
				$data = array(
					'status'	=> '0'
				);
				$hapus = $this->m_frontend->update('kegiatan_laporan',array('id_kegiatan_laporan' => $this->input->post('id')), $data);

				if (!$hapus)
				{
					echo json_encode(['success' => false, 'message' => 'Data Gagal Di Hapus']);
				}
				else 
				{
					echo json_encode(['success' => true, 'message' => 'Data Berhasil Di Hapus']);
				}	
			break;
			case 'pengumuman':
				$data = array(
					'status'	=> '0'
				);
				$hapus = $this->m_frontend->update('pengumuman',array('id_pengumuman' => $this->input->post('id')), $data);

				if (!$hapus)
				{
					echo json_encode(['success' => false, 'message' => 'Data Gagal Di Hapus']);
				}
				else 
				{
					echo json_encode(['success' => true, 'message' => 'Data Berhasil Di Hapus']);
				}	
			break;
			case 'slider':
				$data = array(
					'status'	=> '0'
				);
				$hapus = $this->m_frontend->update('slider',array('id_slider' => $this->input->post('id')), $data);

				if (!$hapus)
				{
					echo json_encode(['success' => false, 'message' => 'Data Gagal Di Hapus']);
				}
				else 
				{
					echo json_encode(['success' => true, 'message' => 'Data Berhasil Di Hapus']);
				}	
			break;
			
			default:

			break;
		}
	}

	public function ajax_list()
	{
		$data 	= array();
		$no 	= $_POST['start'];
		$type 	= $_GET['type'];

		switch ($type) {
			case 'user':
			case 'user_del':
				$list = $this->m_user->get_datatables($type);
				foreach ($list as $l) {
					$no++;
					$row = array();
					$row[] = $no;
					$row[] = $l->nama;
					$row[] = $l->nama_odp;

					if ($l->status == 1) {
						$row[] = '<span class="label label-success">Aktif</span>';
					} else {
						$row[] = '<span class="label label-danger">Tidak Aktif</span>';
					}

					if ($type == 'user') {
						$row[] = '
						<ul class="icons-list" style="text-align:center">
						<li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">
						<i class="icon-menu9"></i>
						</a>
						<ul class="dropdown-menu dropdown-menu-right">
						<li><a href="javascript:void(0);" onclick="edit_user('.$l->id_user.')"><i class="icon-pencil"></i>Ubah User</a></li>
						<li><a href="javascript:void(0);" onclick="hapus_user('.$l->id_user.')"><i class="icon-eraser3"></i>Hapus User</a></li>
						</ul>
						</li>
						</ul>';
					} else {
						$row[] = '
						<ul class="icons-list" style="text-align:center">
						<li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">
						<i class="icon-menu9"></i>
						</a>
						<ul class="dropdown-menu dropdown-menu-right">
						<li><a href="javascript:void(0);" onclick="restore_user('.$l->id_user.')"><i class=" icon-database-refresh"></i>Restore User</a></li>
						</ul>
						</li>
						</ul>';
					}

					$data[] = $row;
				}

				$output = array(
					"draw" 				=> $_POST['draw'],
					"recordsTotal" 		=> $this->m_user->count_all($type),
					"recordsFiltered" 	=> $this->m_user->count_filtered($type),
					"data" 				=> $data,
				);			
			break;
			case 'artikel':
			case 'artikel_del':
				$list = $this->m_artikel->get_datatables($type);
				foreach ($list as $l) {
					$no++;
					$row = array();
					$row[] = $no;
					$row[] = $l->judul;
					$row[] = $l->date;

					if ($l->status == 1) {
						$row[] = '<span class="label label-success">Aktif</span>';
					} else {
						$row[] = '<span class="label label-danger">Tidak Aktif</span>';
					}

					if ($type == 'artikel') {
						$row[] = '
						<ul class="icons-list" style="text-align:center">
						<li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">
						<i class="icon-menu9"></i>
						</a>
						<ul class="dropdown-menu dropdown-menu-right">
						<li><a href="javascript:void(0);" onclick="edit_artikel('.$l->id.')"><i class="icon-pencil"></i>Ubah Artikel</a></li>
						<li><a href="javascript:void(0);" onclick="hapus_artikel('.$l->id.')"><i class="icon-eraser3"></i>Hapus Artikel</a></li>
						</ul>
						</li>
						</ul>';
					} else {
						$row[] = '
						<ul class="icons-list" style="text-align:center">
						<li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">
						<i class="icon-menu9"></i>
						</a>
						<ul class="dropdown-menu dropdown-menu-right">
						<li><a href="javascript:void(0);" onclick="restore_artikel('.$l->id.')"><i class=" icon-database-refresh"></i>Restore Artikel</a></li>
						</ul>
						</li>
						</ul>';
					}

					$data[] = $row;
				}

				$output = array(
					"draw" 				=> $_POST['draw'],
					"recordsTotal" 		=> $this->m_artikel->count_all($type),
					"recordsFiltered" 	=> $this->m_artikel->count_filtered($type),
					"data" 				=> $data,
				);			
			break;
			case 'location':
			case 'location_del':
				$list = $this->m_artikel->get_datatables($type);
				foreach ($list as $l) {
					$no++;
					$row = array();
					$row[] = $no;
					$row[] = $l->location_name;
					$row[] = $l->longitude;
					$row[] = $l->latitude;

					if ($l->status == 1) {
						$row[] = '<span class="label label-success">Aktif</span>';
					} else {
						$row[] = '<span class="label label-danger">Tidak Aktif</span>';
					}

					if ($type == 'location') {
						$row[] = '
						<ul class="icons-list" style="text-align:center">
						<li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">
						<i class="icon-menu9"></i>
						</a>
						<ul class="dropdown-menu dropdown-menu-right">
						<li><a href="javascript:void(0);" onclick="edit_location('.$l->id.')"><i class="icon-pencil"></i>Ubah Lokasi</a></li>
						<li><a href="javascript:void(0);" onclick="hapus_location('.$l->id.')"><i class="icon-eraser3"></i>Hapus Lokasi</a></li>
						</ul>
						</li>
						</ul>';
					} else {
						$row[] = '
						<ul class="icons-list" style="text-align:center">
						<li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">
						<i class="icon-menu9"></i>
						</a>
						<ul class="dropdown-menu dropdown-menu-right">
						<li><a href="javascript:void(0);" onclick="restore_location('.$l->id.')"><i class=" icon-database-refresh"></i>Restore Lokasi</a></li>
						</ul>
						</li>
						</ul>';
					}

					$data[] = $row;
				}

				$output = array(
					"draw" 				=> $_POST['draw'],
					"recordsTotal" 		=> $this->m_artikel->count_all($type),
					"recordsFiltered" 	=> $this->m_artikel->count_filtered($type),
					"data" 				=> $data,
				);			
			break;
			case 'kategori':
			case 'kategori_del':
				$list = $this->m_artikel->get_datatables($type);
				foreach ($list as $l) {
					$no++;
					$row = array();
					$row[] = $no;
					$row[] = $l->judul;

					if ($l->status == 1) {
						$row[] = '<span class="label label-success">Aktif</span>';
					} else {
						$row[] = '<span class="label label-danger">Tidak Aktif</span>';
					}

					if ($type == 'kategori') {
						$row[] = '
						<ul class="icons-list" style="text-align:center">
						<li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">
						<i class="icon-menu9"></i>
						</a>
						<ul class="dropdown-menu dropdown-menu-right">
						<li><a href="javascript:void(0);" onclick="edit_data('.$l->id_kategori.')"><i class="icon-pencil"></i>Ubah Kategori</a></li>
						<li><a href="javascript:void(0);" onclick="hapus_data('.$l->id_kategori.')"><i class="icon-eraser3"></i>Hapus Kategori</a></li>
						</ul>
						</li>
						</ul>';
					} else {
						$row[] = '
						<ul class="icons-list" style="text-align:center">
						<li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">
						<i class="icon-menu9"></i>
						</a>
						<ul class="dropdown-menu dropdown-menu-right">
						<li><a href="javascript:void(0);" onclick="restore_data('.$l->id_kategori.')"><i class=" icon-database-refresh"></i>Restore Kategori</a></li>
						</ul>
						</li>
						</ul>';
					}

					$data[] = $row;
				}

				$output = array(
					"draw" 				=> $_POST['draw'],
					"recordsTotal" 		=> $this->m_artikel->count_all($type),
					"recordsFiltered" 	=> $this->m_artikel->count_filtered($type),
					"data" 				=> $data,
				);				
			break;
			case 'kategori_maps':
			case 'kategori_maps_del':
				$list = $this->m_artikel->get_datatables($type);
				foreach ($list as $l) {
					$no++;
					$row = array();
					$row[] = $no;
					$row[] = $l->category;

					if ($l->status == 1) {
						$row[] = '<span class="label label-success">Aktif</span>';
					} else {
						$row[] = '<span class="label label-danger">Tidak Aktif</span>';
					}

					if ($type == 'kategori_maps') {
						$row[] = '
						<ul class="icons-list" style="text-align:center">
						<li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">
						<i class="icon-menu9"></i>
						</a>
						<ul class="dropdown-menu dropdown-menu-right">
						<li><a href="javascript:void(0);" onclick="edit_data('.$l->id.')"><i class="icon-pencil"></i>Ubah Kategori Maps</a></li>
						<li><a href="javascript:void(0);" onclick="hapus_data('.$l->id.')"><i class="icon-eraser3"></i>Hapus Kategori Maps</a></li>
						</ul>
						</li>
						</ul>';
					} else {
						$row[] = '
						<ul class="icons-list" style="text-align:center">
						<li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">
						<i class="icon-menu9"></i>
						</a>
						<ul class="dropdown-menu dropdown-menu-right">
						<li><a href="javascript:void(0);" onclick="restore_data('.$l->id.')"><i class=" icon-database-refresh"></i>Restore Kategori Maps</a></li>
						</ul>
						</li>
						</ul>';
					}

					$data[] = $row;
				}

				$output = array(
					"draw" 				=> $_POST['draw'],
					"recordsTotal" 		=> $this->m_artikel->count_all($type),
					"recordsFiltered" 	=> $this->m_artikel->count_filtered($type),
					"data" 				=> $data,
				);				
			break;
			case 'laporan':
			case 'laporan_del':
				$list = $this->m_artikel->get_datatables($type);
				foreach ($list as $l) {
					$no++;
					$row = array();
					$row[] = $no;
					$row[] = $l->judul_kegiatan_laporan;
					$row[] = $l->nama_kegiatan;

					if ($l->status == 1) {
						$row[] = '<span class="label label-success">Aktif</span>';
					} else {
						$row[] = '<span class="label label-danger">Tidak Aktif</span>';
					}

					if ($type == 'laporan') {
						$row[] = '
						<ul class="icons-list" style="text-align:center">
						<li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">
						<i class="icon-menu9"></i>
						</a>
						<ul class="dropdown-menu dropdown-menu-right">
						<li><a href="javascript:void(0);" onclick="edit_data('.$l->id_kegiatan_laporan.')"><i class="icon-pencil"></i>Ubah Data</a></li>
						<li><a href="javascript:void(0);" onclick="hapus_data('.$l->id_kegiatan_laporan.')"><i class="icon-eraser3"></i>Hapus Data</a></li>
						</ul>
						</li>
						</ul>';
					} else {
						$row[] = '
						<ul class="icons-list" style="text-align:center">
						<li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">
						<i class="icon-menu9"></i>
						</a>
						<ul class="dropdown-menu dropdown-menu-right">
						<li><a href="javascript:void(0);" onclick="restore_data('.$l->id_kegiatan_laporan.')"><i class=" icon-database-refresh"></i>Restore Data</a></li>
						</ul>
						</li>
						</ul>';
					}

					$data[] = $row;
				}

				$output = array(
					"draw" 				=> $_POST['draw'],
					"recordsTotal" 		=> $this->m_artikel->count_all($type),
					"recordsFiltered" 	=> $this->m_artikel->count_filtered($type),
					"data" 				=> $data,
				);	
			break;
			case 'pengumuman':
			case 'pengumuman_del':
				$list = $this->m_artikel->get_datatables($type);
				foreach ($list as $l) {
					$no++;
					$row = array();
					$row[] = $no;
					$row[] = $l->judul_pengumuman;

					if ($l->status == 1) {
						$row[] = '<span class="label label-success">Aktif</span>';
					} else {
						$row[] = '<span class="label label-danger">Tidak Aktif</span>';
					}

					if ($type == 'pengumuman') {
						$row[] = '
						<ul class="icons-list" style="text-align:center">
						<li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">
						<i class="icon-menu9"></i>
						</a>
						<ul class="dropdown-menu dropdown-menu-right">
						<li><a href="javascript:void(0);" onclick="edit_data('.$l->id_pengumuman.')"><i class="icon-pencil"></i>Ubah Data</a></li>
						<li><a href="javascript:void(0);" onclick="hapus_data('.$l->id_pengumuman.')"><i class="icon-eraser3"></i>Hapus Data</a></li>
						</ul>
						</li>
						</ul>';
					} else {
						$row[] = '
						<ul class="icons-list" style="text-align:center">
						<li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">
						<i class="icon-menu9"></i>
						</a>
						<ul class="dropdown-menu dropdown-menu-right">
						<li><a href="javascript:void(0);" onclick="restore_data('.$l->id_pengumuman.')"><i class=" icon-database-refresh"></i>Restore Data</a></li>
						</ul>
						</li>
						</ul>';
					}

					$data[] = $row;
				}

				$output = array(
					"draw" 				=> $_POST['draw'],
					"recordsTotal" 		=> $this->m_artikel->count_all($type),
					"recordsFiltered" 	=> $this->m_artikel->count_filtered($type),
					"data" 				=> $data,
				);				
			break;
			case 'slider':
			case 'slider_del':
				$list = $this->m_artikel->get_datatables($type);
				foreach ($list as $l) {
					$no++;
					$row = array();
					$row[] = $no;
					$row[] = $l->judul_slider;

					if ($l->status == 1) {
						$row[] = '<span class="label label-success">Aktif</span>';
					} else {
						$row[] = '<span class="label label-danger">Tidak Aktif</span>';
					}

					if ($type == 'slider') {
						$row[] = '
						<ul class="icons-list" style="text-align:center">
						<li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">
						<i class="icon-menu9"></i>
						</a>
						<ul class="dropdown-menu dropdown-menu-right">
						<li><a href="javascript:void(0);" onclick="edit_data('.$l->id_slider.')"><i class="icon-pencil"></i>Ubah Data</a></li>
						<li><a href="javascript:void(0);" onclick="hapus_data('.$l->id_slider.')"><i class="icon-eraser3"></i>Hapus Data</a></li>
						</ul>
						</li>
						</ul>';
					} else {
						$row[] = '
						<ul class="icons-list" style="text-align:center">
						<li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">
						<i class="icon-menu9"></i>
						</a>
						<ul class="dropdown-menu dropdown-menu-right">
						<li><a href="javascript:void(0);" onclick="restore_data('.$l->id_slider.')"><i class=" icon-database-refresh"></i>Restore Data</a></li>
						</ul>
						</li>
						</ul>';
					}

					$data[] = $row;
				}

				$output = array(
					"draw" 				=> $_POST['draw'],
					"recordsTotal" 		=> $this->m_artikel->count_all($type),
					"recordsFiltered" 	=> $this->m_artikel->count_filtered($type),
					"data" 				=> $data,
				);				
			break;
			default:
			break;
		}

		echo json_encode($output);	
	}

	public function ajax_restore()
	{
		$type = $_GET['type'];
		switch ($type) {
			case 'user':
				$data = array(
					'status'	=> '1'
				);
				$hapus = $this->m_frontend->update('user',array('id_user' => $this->input->post('id')), $data);

				if (!$hapus)
				{
					echo json_encode(['success' => false, 'message' => 'Data Gagal Di Restore']);
				}
				else 
				{
					echo json_encode(['success' => true, 'message' => 'Data Berhasil Di Restore']);
				}
			break;
			case 'pengumuman':
				$data = array(
					'status'	=> '1'
				);
				$hapus = $this->m_frontend->update('pengumuman',array('id_pengumuman' => $this->input->post('id')), $data);

				if (!$hapus)
				{
					echo json_encode(['success' => false, 'message' => 'Data Gagal Di Restore']);
				}
				else 
				{
					echo json_encode(['success' => true, 'message' => 'Data Berhasil Di Restore']);
				}	
			break;

			case 'artikel':
				$data = array(
					'status'	=> '1'
				);
				$hapus = $this->m_frontend->update('artikel',array('id' => $this->input->post('id')), $data);

				if (!$hapus)
				{
					echo json_encode(['success' => false, 'message' => 'Data Gagal Di Restore']);
				}
				else 
				{
					echo json_encode(['success' => true, 'message' => 'Data Berhasil Di Restore']);
				}
			break;

			case 'location':
				$data = array(
					'status'	=> '1'
				);
				$hapus = $this->m_frontend->update('tb_location',array('id' => $this->input->post('id')), $data);

				if (!$hapus)
				{
					echo json_encode(['success' => false, 'message' => 'Data Gagal Di Restore']);
				}
				else 
				{
					echo json_encode(['success' => true, 'message' => 'Data Berhasil Di Restore']);
				}
			break;

			case 'kategori':
				$data = array(
					'status'	=> '1'
				);
				$hapus = $this->m_frontend->update('kategori',array('id_kategori' => $this->input->post('id')), $data);

				if (!$hapus)
				{
					echo json_encode(['success' => false, 'message' => 'Data Gagal Di Restore']);
				}
				else 
				{
					echo json_encode(['success' => true, 'message' => 'Data Berhasil Di Restore']);
				}
			break;
			case 'kategori_maps':
				$data = array(
					'status'	=> '1'
				);
				$hapus = $this->m_frontend->update('tb_categories',array('id' => $this->input->post('id')), $data);

				if (!$hapus)
				{
					echo json_encode(['success' => false, 'message' => 'Data Gagal Di Restore']);
				}
				else 
				{
					echo json_encode(['success' => true, 'message' => 'Data Berhasil Di Restore']);
				}
			break;
			case 'laporan':
				$data = array(
					'status'	=> '1'
				);
				$hapus = $this->m_frontend->update('kegiatan_laporan',array('id_kegiatan_laporan' => $this->input->post('id')), $data);

				if (!$hapus)
				{
					echo json_encode(['success' => false, 'message' => 'Data Gagal Di Restore']);
				}
				else 
				{
					echo json_encode(['success' => true, 'message' => 'Data Berhasil Di Restore']);
				}	
			break;

			case 'slider':
				$data = array(
					'status'	=> '1'
				);
				$hapus = $this->m_frontend->update('slider',array('id_slider' => $this->input->post('id')), $data);

				if (!$hapus)
				{
					echo json_encode(['success' => false, 'message' => 'Data Gagal Di Restore']);
				}
				else 
				{
					echo json_encode(['success' => true, 'message' => 'Data Berhasil Di Restore']);
				}	
			break;
			
			default:
				# code...
			break;
		}
	}

	public function json_menu()
	{
		$data 			= json_decode($_POST['data']);
		$readbleArray 	= parseJsonArray($data);

		$i=0;
		foreach($readbleArray as $row)
		{
			$i++;
			$this->db->query("update menu set parent = '".$row['parentID']."', sort = '".$i."' where id = '".$row['id']."' ");
		}
	}

	public function json_nip()
	{
		if(!empty($_POST['id']))
		{
			$cek['table']	= 'user';
			$cek['where']	= 'nip = '.$_POST['data'].' AND id_user != '.$_POST['id'];
		}
		else
		{
			$cek['table']	= 'user';
			$cek['where']	= 'nip = '.$_POST['data'];
		}
		
		$nip = $this->m_frontend->getID($cek);

		if(empty($nip->nip))
		{
			$link = 'http://opendatav2.tangerangkota.go.id/services/pegawai/pegawaibynip/nip/'.$_POST['data'].'/format/json';
			$this->curl->create($link); 

			$this->curl->http_login(REST_U, REST_P);
			$result = json_decode($this->curl->execute(), true);

			$data['nama']		= $result['nama_pegawai'].' '.$result['gelar_belakang'];
			$data['jabatan']	= $result['nomenklatur_jabatan'];
			$data['nama_unor']	= $result['nama_unor'];
			$data['nama_opd']	= $result['nomenklatur_pada'];
			$data['kode_unor']	= $result['kode_unor'];	
			$data['pangkat']	= $result['nama_pangkat'].'('.$result['nama_golongan'].')';
		}
		else
		{
			$data['nama']		= "";
			$data['jabatan']	= "";
			$data['nama_unor']	= "";
			$data['nama_opd']	= "";
			$data['kode_unor']	= "";
			$data['notif']		= "Data NIP Sudah Terdaftar";
		}
		
		echo json_encode($data);
	}

	private function _validate()
	{
		$data = array();
		$data['error_string'] = array();
		$data['inputerror'] = array();
		$data['status'] = TRUE;

		if(isset($_POST['judul_pengumuman']))
		{
			if($this->input->post('judul_pengumuman') == '')
			{
				$data['inputerror'][] = 'judul_pengumuman';
				$data['error_string'][] = 'Data Tidak Boleh Kosong';
				$data['status'] = FALSE;
			}
			if($this->input->post('tanggal_pengumuman') == '')
			{
				$data['inputerror'][] = 'tanggal_pengumuman';
				$data['error_string'][] = 'Data Tidak Boleh Kosong';
				$data['status'] = FALSE;
			}

			if($data['status'] === FALSE)
			{
				echo json_encode($data);
				exit();
			}
		}

		if(isset($_POST['judul_kategori']))
		{
			if($this->input->post('judul_kategori') == '')
			{
				$data['inputerror'][] = 'kategori';
				$data['error_string'][] = 'Data Tidak Boleh Kosong';
				$data['status'] = FALSE;
			}

			if($data['status'] === FALSE)
			{
				echo json_encode($data);
				exit();
			}
		}

		if(isset($_POST['nip']))
		{
			if($this->input->post('nip') == '')
			{
				$data['inputerror'][] = 'nip';
				$data['error_string'][] = 'NIP Tidak Boleh Kosong';
				$data['status'] = FALSE;
			}
			else if($this->input->post('nama_pegawai') == '')
			{
				$data['inputerror'][] = 'nama_pegawai';
				$data['error_string'][] = 'Nama Pegawai Tidak Boleh Kosong';
				$data['status'] = FALSE;
			}
			else if($this->input->post('nama_odp') == '')
			{
				$data['inputerror'][] = 'nama_odp';
				$data['error_string'][] = 'Nama ODP Tidak Boleh Kosong';
				$data['status'] = FALSE;
			}

			if($data['status'] === FALSE)
			{
				echo json_encode($data);
				exit();
			}
		}

		if(isset($_POST['menu']))
		{
			if($this->input->post('menu') == '')
			{
				$data['inputerror'][] = 'menu';
				$data['error_string'][] = 'Judul Menu Tidak Boleh Kosong';
				$data['status'] = FALSE;
			}

			if($data['status'] === FALSE)
			{
				echo json_encode($data);
				exit();
			}
		}

		if(isset($_POST['judul']))
		{
			if($this->input->post('judul') == '')
			{
				$data['inputerror'][] = 'judul';
				$data['error_string'][] = 'Data Tidak Boleh Kosong';
				$data['status'] = FALSE;
			}

			if($this->input->post('id_kategori') == 0)
			{
				$data['inputerror'][] = 'kategori';
				$data['error_string'][] = 'Data Tidak Boleh Kosong';
				$data['status'] = FALSE;
			}

			if($data['status'] === FALSE)
			{
				echo json_encode($data);
				exit();
			}
		}
		
	}

	
}
