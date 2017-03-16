(function () {
    var processEnterCmd = {
        exec: function (editor) {
            var insideGallery = editor.getSelection().getStartElement().getAscendant(function (el) {
                return typeof el.hasClass === 'function' && el.hasClass('jsplus_gallery');
            });
            if (insideGallery == undefined) {
                editor.execCommand('enter');
            } else {
                var galleryItem = editor.getSelection().getStartElement().getAscendant(function (el) {
                    return typeof el.hasClass === 'function' && el.hasClass('item_wrap');
                });
                if (galleryItem != undefined) {
                    var newItem = CKEDITOR.dom.element.createFromHtml("<div class='item_wrap'><div class='item'><div class='preview'>&nbsp;</div><div class='caption'></div></div></div>");
                    newItem.insertAfter(galleryItem);
                }
            }
        }
    };
    var pluginName = 'gallery_admin';
    CKEDITOR.plugins.add(pluginName, {
        init: function (editor) {
            editor.addCommand(pluginName, processEnterCmd);
        }
    });
})();