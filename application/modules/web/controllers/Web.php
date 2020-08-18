<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Web extends MX_Controller 
{
	public function index()
	{	
		$data_headline['select']	= 'a.*,a.id as id_artikel,b.*,c.judul as judul_kategori';
		$data_headline['table']		= 'artikel as a';
		$data_headline['join'][0]	= array('menu as b','b.id_kategori = a.id_kategori');
		$data_headline['join'][1]	= array('kategori as c','c.id_kategori = b.id_kategori');
		$data_headline['where']		= 'c.judul = "Berita dan Artikel" AND a.status = 1 AND a.headline = 1';
		$data_headline['limit']		= '4';
		$data_headline['order']		= 'a.date DESC'; 
		$headline 					= $this->m_frontend->getData($data_headline);

		$data_news['select']	= 'a.*,a.id as id_artikel,b.*,c.judul as judul_kategori';
		$data_news['table']		= 'artikel as a';
		$data_news['join'][0]	= array('menu as b','b.id_kategori = a.id_kategori');
		$data_news['join'][1]	= array('kategori as c','c.id_kategori = b.id_kategori');
		$data_news['where']		= 'c.judul = "Berita dan Artikel" AND a.status = 1 AND a.headline != 1';
		$data_news['limit']		= '5';
		$data_news['order']		= 'a.date DESC'; 
		$last_news 				= $this->m_frontend->getData($data_news);

		$data_side['select']	= 'a.*,a.id as id_artikel,b.*,c.judul as judul_kategori';
		$data_side['table']		= 'artikel as a';
		$data_side['join'][0]	= array('menu as b','b.id_kategori = a.id_kategori');
		$data_side['join'][1]	= array('kategori as c','c.id_kategori = b.id_kategori');
		$data_side['where']		= 'c.judul = "Berita dan Artikel" AND a.status = 1';
		$data_side['limit']		= '5';
		$data_side['order']		= "rand()"; 
		$side_news 				= $this->m_frontend->getData($data_side);

		$data_slide['select']		= '*';
		$data_slide['table']		= 'slider';
		$data_slide['where']		= 'status = 1';
		$data_slide['order']		= 'id_slider DESC';
		$data_slide['limit']		= '4';
		$slider 					= $this->m_frontend->getData($data_slide);

		$menu 						= $this->m_frontend->getMenu();

		$this->data = array(
			'menu' 			=> $menu,
			'side_news'		=> $side_news,
			'last_news'		=> $last_news,
			'headline'		=> $headline,
			'slider'		=> $slider,
			'title_page'	=> 'Profil Desa Kranggan',
			'content'		=> 'home'
		);
		$this->load->view('layout',$this->data);
	}

	public function home()
	{
		$data_slide['select']		= '*';
		$data_slide['table']		= 'slider';
		$data_slide['where']		= 'status = 1';
		$data_slide['order']		= 'id_slider DESC';
		$data_slide['limit']		= '4';
		$slider 					= $this->m_frontend->getData($data_slide);

		$data_headline['select']	= 'a.*,a.id as id_artikel,b.*,c.judul as judul_kategori';
		$data_headline['table']		= 'artikel as a';
		$data_headline['join'][0]	= array('menu as b','b.id_kategori = a.id_kategori');
		$data_headline['join'][1]	= array('kategori as c','c.id_kategori = b.id_kategori');
		$data_headline['where']		= 'c.judul = "Berita dan Artikel" AND a.status = 1 AND a.headline = 1';
		$data_headline['limit']		= '4';
		$data_headline['order']		= 'a.date DESC'; 
		$headline 					= $this->m_frontend->getData($data_headline);

		$data_news['select']	= 'a.*,a.id as id_artikel,b.*,c.judul as judul_kategori';
		$data_news['table']		= 'artikel as a';
		$data_news['join'][0]	= array('menu as b','b.id_kategori = a.id_kategori');
		$data_news['join'][1]	= array('kategori as c','c.id_kategori = b.id_kategori');
		$data_news['where']		= 'c.judul = "Berita dan Artikel" AND a.status = 1 AND a.headline != 1';
		$data_news['limit']		= '5';
		$data_news['order']		= 'a.date DESC'; 
		$last_news 				= $this->m_frontend->getData($data_news);

		$data_side['select']	= 'a.*,a.id as id_artikel,b.*,c.judul as judul_kategori';
		$data_side['table']		= 'artikel as a';
		$data_side['join'][0]	= array('menu as b','b.id_kategori = a.id_kategori');
		$data_side['join'][1]	= array('kategori as c','c.id_kategori = b.id_kategori');
		$data_side['where']		= 'c.judul = "Berita dan Artikel" AND a.status = 1';
		$data_side['limit']		= '5';
		$data_side['order']		= "rand()"; 
		$side_news 				= $this->m_frontend->getData($data_side);

		$this->data = array(
			'slider' 			=> $slider,
			'title_page'		=> 'Beranda',
			'side_news'			=> $side_news,
			'last_news'			=> $last_news,
			'headline'			=> $headline,
		);
		$this->load->view('home',$this->data);
	}

	public function data($type=null,$id=null)
	{
		$data_side['select']	= 'a.*,a.id as id_artikel,b.*,c.judul as judul_kategori';
		$data_side['table']		= 'artikel as a';
		$data_side['join'][0]	= array('menu as b','b.id_kategori = a.id_kategori');
		$data_side['join'][1]	= array('kategori as c','c.id_kategori = b.id_kategori');
		$data_side['where']		= 'c.judul = "Berita dan Artikel" AND a.status = 1';
		$data_side['limit']		= '5';
		$data_side['order']		= "rand()"; 
		$side_news 				= $this->m_frontend->getData($data_side);

		$data_slide['select']		= '*';
		$data_slide['table']		= 'slider';
		$data_slide['where']		= 'status = 1';
		$data_slide['order']		= 'id_slider DESC';
		$data_slide['limit']		= '4';
		$slider 					= $this->m_frontend->getData($data_slide);

		$data_detail['select']	= 'a.*,a.id as id_artikel,b.*';
		$data_detail['table']		= 'artikel as a';
		$data_detail['join'][0]	= array('menu as b','b.id_kategori = a.id_kategori');
		
		if(is_null($id)):
			$data_detail['where']		= 'a.status = 1 AND b.link = "'.$type.'"';
		else:
			$data_detail['where']		= 'a.id = "'.$id.'"';
			
		endif;
		$data_detail['order']		= 'a.date DESC'; 
		$detail 					= $this->m_frontend->getData($data_detail);
		

		if(empty($detail[0]->judul)){
			$menu_detail['select']		= 'a.*';
			$menu_detail['table']		= 'menu as a';
			$menu_detail['where']		= 'a.link = "'.$type.'"';
			$detail 					= $this->m_frontend->getData($menu_detail);
		}

		$this->data = array(
			'slider' 			=> $slider,
			'side_news'			=> $side_news,
			'detail'			=> $detail,
			'title_page'		=> 'Beranda',
		);
		$row = count($detail);
		if($row <= 1)
		{
			$this->load->view('single',$this->data);
		}
		else
		{
			$this->load->view('category',$this->data);
		}
	}

	public function maps()
    {
        // $this->load->view('maps');
        $this->load->view('maps_v2');
    }

    public function getListMarker()
    {
        $list = $this->m_frontend->get_list_marker();
        echo json_encode($list);
    }

    public function getDataLocation()
    {   $list = [];
        $list = $this->m_frontend->get_location_data();
        echo json_encode($list);
    }

    public function getDataKategori()
    {   $list = [];
        $list = $this->m_frontend->get_category_data();
        echo json_encode($list);
    }

    public function getDatakoor()
    {   $list = [];
        $id =  $this->input->post('data');
        $list = $this->m_frontend->get_datakoor($id);
        echo json_encode($list);
    }

    public function goToDetailLocation()
    {
        $id = $this->input->get("id");
        echo json_encode($id);
        // redirect('Login');
    }

    public function getDataLocationMaps()
    {
        $list = $this->m_frontend->get_data_location_maps();
        
        $data = array();
        $no = $_POST['start'];
        foreach ($list as $item) {
            $no++;
            $row = array();
            $row[] = $no;
            $row[] = $item->id;
            $row[] = $item->category;
            $row[] = $item->location_name;
            $row[] = $item->longitude;
            $row[] = $item->latitude;
            $row[] = $item->description;
            $row[] = $item->username;
            $row[] = '<button type="button" class="btn btn-success waves-effect" onClick="editLocation('.$item->id.');">'.
                    '<i class="fas fa-edit"></i> Edit</button> '.
                    '<button type="button" class="btn btn-danger waves-effect" onClick="deleteLocation('.$item->id.');">'.
                    '<i class="fas fa-trash"></i> Delete</button>';
            $data[] = $row;
        }
 
        $output = array(
            "draw" => $_POST['draw'],
            "recordsTotal" => $this->m_frontend->count_all(),
            "recordsFiltered" => $this->m_frontend->count_filtered(),
            "data" => $data
        );

        //output to json format
        echo json_encode($output);
    }

    public function getDataLocationMaps_()
    {
        $list = $this->m_frontend->getDataLocationMaps_();
        
        //output to json format
        echo json_encode($list);
    }

}
