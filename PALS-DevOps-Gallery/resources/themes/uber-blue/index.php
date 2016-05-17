<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <title>DevOps with Microsoft Cloud - Join us for the Round Table Event</title>
    <link rel="shortcut icon" href="<?php echo THEMEPATH; ?>/images/favicon.png" />
		<link rel="stylesheet" href="../css/microsoft-template-style-v2.css"/>

    <link rel="stylesheet" type="text/css" href="<?php echo THEMEPATH; ?>/rebase-min.css" />
    <link rel="stylesheet" type="text/css" href="<?php echo THEMEPATH; ?>/style.css" />
    <?php echo $gallery->getColorboxStyles(5); ?>

    <script type="text/javascript" src="//code.jquery.com/jquery-2.1.4.min.js"></script>
    <?php echo $gallery->getColorboxScripts(); ?>

    <?php file_exists('googleAnalytics.inc') ? include('googleAnalytics.inc') : false; ?>

		<style>
.form-section { display:none; }
.ms-banner-section { background-image: url(../Images/banner.jpg); height:354px; margin: -79px 0 0; }
.banner-title-text { color:#000000; }
.r123FormSubmit, .r123FormSubmit:hover { background-color: #438ab4; color:#ffffff }
</style>

</head>
<body>

<div>
          <div class="header-section">
    <div class="section-wrapper">
              <div class="ms-header-left-logo"> <a href="http://www.microsoft.com/" target="_blank"><img src="../Images/EN-BASICE-Banner-AzureLogoBlack.png"></a></div>
              <div class="ms-header-right-logo"><a href="http://www.palsglobalsolutions.com/" target="_blank"> <img src="../Images/EN-BASICE-Logo-MSFTLogo.png"></a></div>
            </div>
  </div>
          <a href="http://events.palsglobalsolutions.com"><div class="ms-banner-section">
    <div class="section-wrapper paddingLRZero">
              <div id="banner-title"><span class="banner-title-text"></span></div>
              <div id="banner-image"></div>
            </div>
  </div>
  </a>
  </div>
  </div>
  </div>
<!-- Start UberGallery v<?php echo UberGallery::VERSION; ?> - Copyright (c) <?php echo date('Y'); ?> Chris Kankiewicz (http://www.ChrisKankiewicz.com) -->
<div id="galleryWrapper">
    <h1>DevOps with Microsoft Cloud - Join us for the Round Table Event</h1>
    <div class="line"></div>

    <?php if($gallery->getSystemMessages()): ?>
        <ul id="systemMessages">
            <?php foreach($gallery->getSystemMessages() as $message): ?>
                <li class="<?php echo $message['type']; ?>">
                    <?php echo $message['text']; ?>
                </li>
            <?php endforeach; ?>
        </ul>
    <?php endif; ?>

    <div id="galleryListWrapper">
        <?php if (!empty($galleryArray) && $galleryArray['stats']['total_images'] > 0): ?>
            <ul id="galleryList" class="clearfix">
                <?php foreach ($galleryArray['images'] as $image): ?>
                    <li><a href="<?php echo html_entity_decode($image['file_path']); ?>" title="<?php echo $image['file_title']; ?>" rel="colorbox"><img src="<?php echo $image['thumb_path']; ?>" alt="<?php echo $image['file_title']; ?>"/></a></li>
                <?php endforeach; ?>
            </ul>
        <?php endif; ?>
    </div>

    <div class="line"></div>
    <div id="galleryFooter" class="clearfix">

        <?php if ($galleryArray['stats']['total_pages'] > 1): ?>
        <ul id="galleryPagination">

            <?php foreach ($galleryArray['paginator'] as $item): ?>

                <li class="<?php echo $item['class']; ?>">
                    <?php if (!empty($item['href'])): ?>
                        <a href="<?php echo $item['href']; ?>"><?php echo $item['text']; ?></a>
                    <?php else: ?><?php echo $item['text']; ?><?php endif; ?>
                </li>

            <?php endforeach; ?>

        </ul>
        <?php endif; ?>

        <div id="credit"><a href="http://www.palsglobalsolutions.com">PALS Global Solutions</a></div>
    </div>
</div>
<!-- End UberGallery - Distributed under the MIT license: http://www.opensource.org/licenses/mit-license.php -->

</body>
</html>
