var UINestable = function () {

    var updateOutput = function (e) {
        var list = e.length ? e : $(e.target),
            output = list.data('output');
        if (window.JSON) {
            output.val(window.JSON.stringify(list.nestable('serialize'))); //, null, 2));
        } else {
            output.val('JSON browser support required for this demo.');
        }
    };


    return {
        //main function to initiate the module
        init: function () {

            // activate Nestable for list 1
            // $('#nestable_list_1').nestable({
            //     group: 1
            // })
            //     .on('change', updateOutput);

            // activate Nestable for list 2
            // $('#nestable_list_2').nestable({
            //     group: 1
            // })
            //     .on('change', updateOutput);

            // output initial serialised data
            // updateOutput($('#nestable_list_1').data('output', $('#nestable_list_1_output')));
            // updateOutput($('#nestable_list_2').data('output', $('#nestable_list_2_output')));

            // $('#nestable_list_menu').on('click', function (e) {
            //     var target = $(e.target),
            //         action = target.data('action');
            //     if (action === 'expand-all') {
            //         $('.dd').nestable('expandAll');
            //     }   
            //     if (action === 'collapse-all') {
            //         $('.dd').nestable('collapseAll');
            //     }
            // });

            $('#nestable_list_3').nestable();
            $("#test").nestable({
                group:1,
                itemClass:"dd-items"
            });
            $(document).delegate(".js-del,.j-new-cancel","click",function(e){
                e.stopPropagation();
                $(this).parent().remove();
            });
            $(document).delegate(".j-new-ok","click",function(){
                var title=$(this).parent().find("input").val();
                $(this).closest("li").before('<li class="dd-item type-item" data-id=""><div class="dd-handle small-type">'+ title +'</div><span class="js-del">x</span></li>');
                $(this).closest("li").remove();
            });
            $(document).delegate(".pop","mouseleave",function(e){
               $(this).remove();
            });
            $(document).delegate(".js-one-type","click",function(e){
               var html = '<li class="dd-item dd3-item edit"><div class="icon dd-icon"></div><div class="dd3-content js-show" data-action="collapse"><span class="js-title"></span> <span class="icon setting js-set"></span><p class="edit-name j-edit-name"><input type="text" value="新建一级分类" maxlength="10"><a class="rename-ok j-edit-ok " data-level="3" data-parentid="560388c20cf2975fd3d592f3" href="javascript:;"></a><a class="rename-cancel js-edit-cancel" href="javascript:;"></a></p></div><ol class="dd-list"><span class="add-type js-two-type">+新建二级分类</span></ol></li>';
               $(this).before(html);
            });
            $(document).delegate(".js-two-type","click",function(e){
               var html = '<li class="dd-item dd3-item sub-item edit"><div class="icon dd-sub-icon"></div><div class="dd3-content"><span class="js-title"></span> <span class="icon setting js-set"></span><p class="edit-name j-edit-name"><input type="text" value="新建二级分类" maxlength="10"><a class="rename-ok j-edit-ok " data-level="3" data-parentid="560388c20cf2975fd3d592f3" href="javascript:;"></a><a class="rename-cancel js-edit-cancel" href="javascript:;"></a></p></div><div class="subcat-bd"><ol class=""><li class=" tercat-item tercat-new"><a class="tercat-add j-add-tercat" data-parentid="560388c20cf2975fd3d592f3" href="javascript:;">+ 添加</a></li></ol></div></li>';
               $(this).before(html);
            });
        }

    };

}();