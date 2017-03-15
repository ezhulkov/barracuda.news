(function () {
    var processEnterCmd = {
        exec: function (editor) {
            var insideGallery = editor.getSelection().getStartElement().getAscendant(function (el) {
                return typeof el.hasClass === 'function' && el.hasClass('jsplus_gallery');
            });
            if (insideGallery == undefined) {
                editor.execCommand('enter');
            }
            return;
        }
    };
    var pluginName = 'gallery_admin';
    CKEDITOR.plugins.add(pluginName, {
        init: function (editor) {
            editor.addCommand(pluginName, processEnterCmd);
        }
    });
})();