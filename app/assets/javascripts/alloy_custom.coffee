if (typeof AlloyEditor != 'undefined')

  CKEDITOR.DEFAULT_AE_EMBED_URL_TPL = '//iframe.ly/api/oembed?url={url}&callback={callback}&api_key=70ef4f2a4a266b31fc44b5';

  @alloyConfig = {
    jsplus_uploader_url: "/admin/gallery_upload",
    jsplus_gallery_template_wrap: "<div class='jsplus_gallery fotorama' data-width='100%' data-ratio='3/2'>{ITEMS}</div>",
    jsplus_gallery_template: "<div class='item_wrap'><div class='item'><div class='preview'><img class='gallery-image' src='{PREVIEW}'/></div><div class='caption'></div></div></div>",
    jsplus_gallery_thumb_resize_show: false,
    jsplus_gallery_default_thumb_enlarge: false,
    jsplus_gallery_img_resize_show: false,
    jsplus_gallery_default_img_resize: false,
    extraPlugins: AlloyEditor.Core.ATTRS.extraPlugins.value + ",jsplus_gallery,ae_buttonbridge,gallery_admin"
    keystrokes: [
      [13, 'gallery_admin']
    ]
    toolbars: {
      add: {
        buttons: ['image', 'link', 'table', 'embed', 'jsplus_gallery']
      },
      styles: {
        selections: [{
          name: 'link',
          buttons: ['linkEdit'],
          test: AlloyEditor.SelectionTest.link
        }, {
          name: 'text',
          buttons: [{
            name: 'styles',
            cfg: {
              styles: [
                {
                  name: 'Normal text',
                  style: {element: 'p'}
                },
                {
                  name: 'Heading',
                  style: {element: 'h2'}
                },
                {
                  name: 'Heading small',
                  style: {element: 'h3'}
                },
                {
                  name: 'Photo caption',
                  style: {
                    element: 'p',
                    attributes: {
                      class: 'photo-caption'
                    }
                  }
                },
                {
                  name: 'Interview question',
                  style: {
                    element: 'p',
                    attributes: {
                      class: 'q'
                    }
                  }
                },
                {
                  name: 'Interview answer',
                  style: {
                    element: 'p',
                    attributes: {
                      class: 'a'
                    }
                  }
                }
              ]
            }
          }, 'bold', 'italic', 'underline', 'link', 'ul', 'ol', 'paragraphLeft', 'paragraphCenter', 'paragraphRight', 'paragraphJustify', 'removeFormat'],
          test: AlloyEditor.SelectionTest.text
        }, {
          name: 'table',
          buttons: ['tableRow', 'tableColumn', 'tableCell', 'tableRemove'],
          getArrowBoxClasses: AlloyEditor.SelectionGetArrowBoxClasses.table,
          setPosition: AlloyEditor.SelectionSetPosition.table,
          test: AlloyEditor.SelectionTest.table
        }]
      }
    }
  }