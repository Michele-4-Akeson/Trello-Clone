
/*

UNSPLASH API: IMAGE SEARCH

*/

// need to figure out how to hide in .env
const UNSPLASH_URL="https://api.unsplash.com/search/photos"
const UNSPLASH_AUTH="7HwNa-PShmhGm-te4pHnvGGAxIRsw6UTtkNrnaD9TxM"




 ///////////////////////////////////////////////////////
 // UNSPLASH: IMAGES
 ///////////////////////////////////////////////////////


 export async function getImages(searchQuery){
    try{
      const response = await fetch(UNSPLASH_URL + "?page=1" + "&per_page=12" + "&query=" + searchQuery +"&client_id=" + UNSPLASH_AUTH, {
        method:"GET",
        headers: {
          "Content-Type":"application/json",
          "Accept":"application/json",
        },
      });
      return response.json();
  
  } catch (error) {
    console.log(error);
    return null
  
  }
  
}
  