if (typeof AlloyEditor != 'undefined')
  React = AlloyEditor.React
  ButtonGalleryItem = React.createClass({
    mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonActionStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand],
    propTypes: {
      editor: React.PropTypes.object.isRequired
    },
    getDefaultProps: () ->
      {
        command: 'gallery-item',
        style: {
          element: 'li',
        }
      }
    ,
    statics: {
      key: 'gallery-item'
    },
    render: () ->
      cssClass = 'ae-button ' + this.getStateClasses()
      props = {
        'className': cssClass,
        'area-label': 'Insert Gallery Item',
        'title': 'Insert Gallery Item',
        'data-type': 'button-gallery',
        'tabIndex': this.props.tabIndex,
        'onClick': this.execCommand
      }
      child = React.createElement("span", {'className': 'ae-icon-gallery-item'})
      return React.createElement("button", props, child)
  })
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
        'data-type': 'button-gallery',
        'tabIndex': this.props.tabIndex,
        'onClick': this.execCommand
      }
      child = React.createElement("span", {'className': 'ae-icon-gallery'})
      return React.createElement("button", props, child)
  })
  AlloyEditor.Buttons[ButtonGallery.key] = ButtonGallery;
  AlloyEditor.Buttons[ButtonGalleryItem.key] = ButtonGalleryItem;
  galleryCommand = {
    canUndo: true,
    exec: (editor) ->
      editor.insertHtml("<ul class='gallery'><li><p class='image'></p><p class='caption'></p></li></ul>")
    ,
    allowedContent: "ul",
    requiredContent: "ul"
  }
  CKEDITOR.plugins.add("gallery", {
    init: (editor) ->
      editor.addCommand("gallery", galleryCommand)
  })
  galleryItemCommand = {
    canUndo: true,
    exec: (editor) ->
      editor.insertHtml("<li><p class='image'></p><p class='caption'></p></li>")
    ,
    allowedContent: "li",
    requiredContent: "ul"
  }
  CKEDITOR.plugins.add("gallery-item", {
    init: (editor) ->
      editor.addCommand("gallery-item", galleryItemCommand)
  })
  CKEDITOR.config.plugins = CKEDITOR.config.plugins + ",gallery,gallery-item"
  CKEDITOR.DEFAULT_AE_EMBED_URL_TPL = '//iframe.ly/api/oembed?url={url}&callback={callback}&api_key=70ef4f2a4a266b31fc44b5';

  @alloyConfig = {
    toolbars: {
      add: {
        buttons: ['image', 'link', 'table', 'embed', 'gallery', 'gallery-item']
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