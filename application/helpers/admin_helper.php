<?php

if (!defined('BASEPATH')) exit('No direct script access allowed');

function isLogin()
{
	if($_SESSION['login'] != true)
	{
		$CI = get_instance();
		$CI->session->set_flashdata('error_login','Maaf Anda Belum Login');
		redirect('login');
	}
}

function selengkapnya($text){
	$text = strip_tags($text);
	$cut_text = substr($text, 0,100);
	if(strlen($text) <= 150)
	{
		$cut_text = $text;
	}
	else if ($text{150 - 1} != ' ')
	{
		$new_pos = strrpos($cut_text, ' ');
		$cut_text = substr($text, 0, $new_pos);
	}

	return $cut_text.' ...';
}

function images($id)
{
	$CI = get_instance();
	$query['select'] = "*";
	$query['table']	= "kegiatan_foto";
	$query['where']	= 'status = 1 AND id_kegiatan_laporan = '.$id;
	$data = $CI->m_frontend->getData($query);
	if(isset($data[0]->album_kegiatan_foto))
	{
		return img("assets/files/laporan/".$data[0]->album_kegiatan_foto."");
	}
	else
	{
		return img("");
	}
}

function indonesian_date ($timestamp = '', $date_format = 'l, j F Y | H:i', $suffix = 'WIB') {
	if(stripos($timestamp, "00:00:00") !== false)
	{
		$date_format = 'l, j F Y';
		$suffix = '';
	}

	if (trim ($timestamp) == '')
	{
		$timestamp = time ();
	}
	elseif (!ctype_digit ($timestamp))
	{
		$timestamp = strtotime ($timestamp);
	}
    # remove S (st,nd,rd,th) there are no such things in indonesia :p
	$date_format = preg_replace ("/S/", "", $date_format);
	$pattern = array (
		'/Mon[^day]/','/Tue[^sday]/','/Wed[^nesday]/','/Thu[^rsday]/',
		'/Fri[^day]/','/Sat[^urday]/','/Sun[^day]/','/Monday/','/Tuesday/',
		'/Wednesday/','/Thursday/','/Friday/','/Saturday/','/Sunday/',
		'/Jan[^uary]/','/Feb[^ruary]/','/Mar[^ch]/','/Apr[^il]/','/May/',
		'/Jun[^e]/','/Jul[^y]/','/Aug[^ust]/','/Sep[^tember]/','/Oct[^ober]/',
		'/Nov[^ember]/','/Dec[^ember]/','/January/','/February/','/March/',
		'/April/','/June/','/July/','/August/','/September/','/October/',
		'/November/','/December/',
	);
	$replace = array ( 'Sen','Sel','Rab','Kam','Jum','Sab','Min',
		'Senin','Selasa','Rabu','Kamis','Jumat','Sabtu','Minggu',
		'Jan','Feb','Mar','Apr','Mei','Jun','Jul','Ags','Sep','Okt','Nov','Des',
		'Januari','Februari','Maret','April','Juni','Juli','Agustus','Sepember',
		'Oktober','November','Desember',
	);
	$date = date ($date_format, $timestamp);
	$date = preg_replace ($pattern, $replace, $date);
	$date = "{$date} {$suffix}";
	return $date;
} 

function kegiatan($id = null)
{
	$CI = get_instance();
	$query['select'] = "*";
	$query['table']	= "kegiatan";
	$query['where']	= 'status = 1';
	$data = $CI->m_frontend->getData($query);
	$kegiatan = "<option value='0'>Pilih Kegiatan</option>";
	foreach ($data as $value) {
		if($id == $value->id_kegiatan)
		{
			$kegiatan .= "<option value='".$value->id_kegiatan."' selected='selected'> ".$value->nama_kegiatan." </option>";
		}
		else
		{
			$kegiatan .= "<option value='".$value->id_kegiatan."'> ".$value->nama_kegiatan." </option>";
		}
	}
	return $kegiatan;
}

function menu($id = null)
{
	$CI = get_instance();
	$query['select'] = "*";
	$query['table']	= "menu";
	$data = $CI->m_frontend->getData($query);
	$parent = "<option value='0'>Pilih Parent</option>";
	foreach ($data as $value) {
		if($id == $value->id)
		{
			$parent .= "<option value='".$value->id."' selected='selected'> ".$value->menu." </option>";
		}
		else
		{
			$parent .= "<option value='".$value->id."'> ".$value->menu." </option>";
		}
	}
	return $parent;
}

function kategori($id = null)
{
	$CI = get_instance();
	$query['select'] = "*";
	$query['table']	= "kategori";
	$query['where']	= 'status = 1';
	$data = $CI->m_frontend->getData($query);
	$kategori = "<option value='0'>Pilih Kategori</option>";
	foreach ($data as $value) {
		if($id == $value->id_kategori)
		{
			$kategori .= "<option value='".$value->id_kategori."' selected='selected'> ".$value->judul." </option>";
		}
		else
		{
			$kategori .= "<option value='".$value->id_kategori."'> ".$value->judul." </option>";
		}
	}
	return $kategori;
}

function kategori_lokasi($id = null)
{
	$CI = get_instance();
	$query['select'] = "*";
	$query['table']	= "tb_categories";
	$query['where']	= 'status = 1';
	$data = $CI->m_frontend->getData($query);
	$kategori = "<option value='0'>Pilih Kategori</option>";
	foreach ($data as $value) {
		if($id == $value->id)
		{
			$kategori .= "<option value='".$value->id."' selected='selected'> ".$value->category." </option>";
		}
		else
		{
			$kategori .= "<option value='".$value->id."'> ".$value->category." </option>";
		}
	}
	return $kategori;
}

function tahun($id = null)
{
	$tahun = date('Y');
	$tahun = $tahun + 2;
	$years = "<option value='0'>Pilih Tahun</option>";
	for ($i=0; $i<6; $i++) {
		$tahun = $tahun - 1; 
		if($tahun == $id)
		{
			$years .=  "<option value='".$tahun."' selected='selected'> ".$tahun." </option>";
		}
		else
		{
			$years .= "<option value='".$tahun."'> ".$tahun." </option>";
		}
	}
	return $years;
}

function bulan($id = null)
{
	$CI = get_instance();
	$data['select'] = "*";
	$data['table'] = "bulan";
	$data['bulan'] = $CI->m_frontend->getData($data);
	$bulan = "<option value='0'>Pilih Bulan</option>";
	foreach ($data['bulan'] as $row)
	{
		if($id == $row->id)
		{
			$bulan .= "<option selected value='".$row->id."'>".$row->nama."</option>";
		}
		else
		{
			$bulan .= "<option value='".$row->id."'>".$row->nama."</option>";
		}
	}
	return $bulan;
}

function tingkat_pendidikan($id = null)
{
	$CI = get_instance();
	$data['select'] = "*";
	$data['table'] = "pendidikan_tingkat";
	$data['pendidikan'] = $CI->m_frontend->getData($data);
	foreach ($data['pendidikan'] as $row)
	{
		if($id == $row->id)
		{
			$pendidikan .= "<option selected value='".$row->id."'>".$row->nama."</option>";
		}
		else
		{
			$pendidikan .= "<option value='".$row->id."'>".$row->nama."</option>";
		}
	}
	return $pendidikan;
}

function data_bulan($id=null)
{
	$CI = get_instance();
	$data['select'] = "*";
	$data['table'] = "bulan";
	$data['where'] = "id = ".$id;
	$bulan = $CI->m_frontend->getData($data);
	return $bulan[0]->nama;
}

function toint($data)
{
	return str_replace(",", "", $data);
}

function kependudukan($bulan,$tahun)
{
	$CI = get_instance();
	$CI->curl->create('http://202.58.217.37/lapinduk/index.php/api/data/jml_kel/BULAN/'.$bulan.'_'.$tahun);
	$CI->curl->http_login(LAPI_U, LAPI_P);
	$result = json_decode($CI->curl->execute(), true);
	return $result;
}

function perkawinan($bulan,$tahun)
{
	$CI = get_instance();
	$CI->curl->create('http://202.58.217.37/lapinduk/index.php/api/data/status_kawin_kel/BULAN/'.$bulan.'_'.$tahun);
	$CI->curl->http_login(LAPI_U, LAPI_P);
	$result = json_decode($CI->curl->execute(), true);
	return $result;
}

?>