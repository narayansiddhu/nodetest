$(document).ready(function(){
    $('.delete-recipe').on('click',function(){
        var id =$(this).data('id');
        var url ='/delete/'+id;
        if(confirm('Delete Recipe?')){
            $.ajax({
                url : url,
                type :'DELETE',
                success: function(result){
                    console.log("Deleting Recipe");
                    window.location.href='/';

                },
                error: function(err){
                    alert('cannot delete another user recipe')
                    console.log(err);
                }
                
            });
        }
    });
    // $('.edit-recipe').on('click',function(){
    //     $('#edit-form-title').val($(this).data('title'));
    //     $('#edit-form-description').val($(this).data('description'));
    //     $('#edit-form-ingredients').val($(this).data('ingredients'));
    //     $('#edit-form-id').val($(this).data('id'));



    // });

});