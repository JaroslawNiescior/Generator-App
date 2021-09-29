const gallery = '<div class="gallery">$items</div>';
const item = `
<a
  data-fancybox="gallery_img"
  href='$adress'
  class="link"
  style='background-image: url("$adress")'
>
  <img alt='$name' src='$adress' class="image" />
</a>`;
const css = `
<style>
  .gallery {
    text-align: center;
    line-height: 1;
    font-size: 0;
  }

  .link {
    font-size: 0;
    line-height: 1;
    box-sizing: border-box;
    display: inline-block;
    border: 1px solid #eaeaea;
    margin: 5px;
    width: 200px;
    height: 200px;
    background-position: center;
    background-size: cover;
  }

  .image {
    display: none;
  }
</style>`;

export const initialStateCode = {
  gallery,
  item,
  css,
};
