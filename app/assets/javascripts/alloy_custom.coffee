if (typeof AlloyEditor != 'undefined')
  React = AlloyEditor.React
  ButtonGallery = React.createClass({
    mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonActionStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand],
    propTypes: {
      editor: React.PropTypes.object.isRequired
    },
    getDefaultProps: () ->
      {
        command: 'gallery',
        style: {
          element: 'ul',
        }
      }
    ,
    statics: {
      key: 'gallery'
    },
    render: () ->
      cssClass = 'ae-button ' + this.getStateClasses()
      props = {
        'className': cssClass,
        'area-label': 'Insert Gallery',
        'title': 'Insert Gallery',
        'data-type': 'button-list',
        'tabIndex': this.props.tabIndex,
        'onClick': this.execCommand
      }
      child = React.createElement("span", {'className': 'ae-icon-gallery'})
      return React.createElement("button", props, child)
  })
  AlloyEditor.Buttons[ButtonGallery.key] = ButtonGallery;
  galleryCommand = {
    canUndo: !1,
    exec: (editor) ->
      editor.insertHtml("<ul class='gallery'><li>&nbsp;Insert image here&nbsp;</li></ul>")
    ,
    allowedContent: "ul",
    requiredContent: "ul"
  }
  CKEDITOR.plugins.add("gallery", {
    init: (editor) ->
      editor.addCommand("gallery", galleryCommand)
  })
  CKEDITOR.config.plugins = CKEDITOR.config.plugins + ",gallery"
  CKEDITOR.DEFAULT_AE_EMBED_URL_TPL = '//iframe.ly/api/oembed?url={url}&callback={callback}&api_key=70ef4f2a4a266b31fc44b5';

  @alloyConfig = {
    toolbars: {
      add: {
        buttons: ['image', 'link', 'table', 'embed', 'gallery']
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