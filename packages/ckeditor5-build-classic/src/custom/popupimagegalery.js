import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

import imageIcon from '@ckeditor/ckeditor5-core/theme/icons/image.svg';

import swal from 'sweetalert2';


export default class PopupImageGalery extends Plugin {
    init() {
        const editor = this.editor;

        editor.ui.componentFactory.add( 'popupImageGalery', locale => {
            const view = new ButtonView( locale );

            view.set( {
                label: 'Seleccionar imagen de la galería',
                icon: imageIcon,
                tooltip: true
            } );

            // Callback executed once the image is clicked.
            view.on( 'execute', () => {
                console.log('llega aqui');
                /*new swal( {
                    input: 'text',
                    inputPlaceholder: 'Your image URL'
                } )
                .then ( result => {
                    editor.model.change( writer => {
                        const imageElement = writer.createElement( 'imageBlock', {
                            src: result.value
                        } );
            
                        editor.model.insertContent( imageElement, editor.model.document.selection );
                    } );
                } );*/

                new swal({
                    title: 'Submit your Github username',
                    input: 'text',
                    inputAttributes: {
                      autocapitalize: 'off'
                    },
                    showCancelButton: true,
                    confirmButtonText: 'Look up',
                    showLoaderOnConfirm: true,
                    preConfirm: (login) => {
                      return fetch(`//api.github.com/users/${login}`)
                        .then(response => {
                          if (!response.ok) {
                            throw new Error(response.statusText)
                          }
                          return response.json()
                        })
                        .catch(error => {
                            new swal.showValidationMessage(
                            `Request failed: ${error}`
                          )
                        })
                    },
                    allowOutsideClick: () => !new swal.isLoading(),
                    backdrop: true
                  }).then((result) => {
                    if (result.isConfirmed) {
                        editor.model.change( writer => {
                            const imageElement = writer.createElement( 'imageBlock', {
                                src: result.value.avatar_url
                            } );
                
                            editor.model.insertContent( imageElement, editor.model.document.selection );
                        } );
                        /*Swal.fire({
                            title: `${result.value.login}'s avatar`,
                            imageUrl: result.value.avatar_url
                        })*/
                    }
                  })

            } );

            return view;
        } );
    }
}