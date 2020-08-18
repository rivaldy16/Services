<div id="content">
    <?php
        include ('part/slider_profil.php');
    ?>
    <div class="main-content-wrapper section-padding-100">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-lg-8">
                    <div class="post-content-area mb-100">
                        <div class="title-category">
                            <h5><?php echo $detail[0]->menu; ?></h5>
                        </div>
                        <div class="world-catagory-area">
                            
                            <?php
                            foreach ($detail as $key => $value):
                                ?>
                                <div class="single-blog-post post-style-4 d-flex align-items-center wow ">
                                    <div class="post-thumbnail last_news" style="background-image: url(<?php echo base_url('assets/files/'.$value->foto)?>);">
                                    </div>
                                    <div class="post-content">
                                        <a href="javascript:void();" class="headline" onclick="detail('<?php  echo $value->link; ?>','<?php  echo $value->id_artikel; ?>')">
                                            <h5><?php echo $value->judul; ?></h5>
                                        </a>
                                        <p>
                                            <?php
                                            echo selengkapnya($value->text);
                                            ?>
                                        </p>
                                        <div class="post-meta">
                                            <a href="javascript:void(0);" onclick="detail('<?php  echo $value->link; ?>','<?php  echo $value->id_artikel; ?>')" class="post-date"><?php echo indonesian_date($value->date); ?></a>
                                        </div>
                                    </div>
                                </div>
                                <?php
                            endforeach;
                            ?>
                        </div>
                    </div>
                </div>

                <?php
                    include('part/sidebar.php');
                ?>
            </div>
        </div>
    </div>
</div>