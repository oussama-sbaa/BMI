<template>
    <div class="bg-gray-200 h-screen w-screen ">
        <div id ="cont" class="text-white text-center flex flex-col justify-center items-center">
            <form method="post" class="bg-gray-600 p-5 rounded-lg ">
                <div>
                    <label for="height"></label><br/>
                    <input
                        type="number" class="text-black p-1  rounded-xl" 
                        v-model="height" placeholder="Taille (cm)"
                    />
                </div>
                <div>
                    <label for="weight"></label><br/>
                    <input
                        type="number" class="text-black p-1  rounded-xl"
                        v-model="weight" placeholder="Poids (kg)"
                    />
                </div>
                <br/>
                <button type="button" @click="requestCalculIMC" class="bg-neutral-700 px-10 py-2 rounded-xl hover:bg-neutral-500">
                    Calculez votre IMC 
                </button>
            </form>
            <p class="bg-gray-600 mt-2  px-5 py-2 rounded-xl"
                :class="{'hidden' : colorIMC === null}"
            >
                Your IMC : 
                <span
                    class="font-extrabold"
                    :class="colorIMC"
                >
                    {{ result }}
                </span>
            </p>
            <div id="haha" class="grid grid-cols-2 items-center justify-items-center ">
          <div
            id="sugg"
            ref="suggestions"
            class="bg-gray-600 mt-2 px-5 py-2 text-black p-1 rounded-xl"
            v-if="showSuggest"
            style="height: 14rem;"
          >
          <span class="text-red-500">Conseils: <br></span> {{ seg.conseils }}
          </div>

          <div
            id="sugg1"
            ref="suggestions"
            class="bg-gray-600 mt-2 px-5 py-2 text-black p-1 rounded-xl"
            v-if="showSuggest"
            style="height: 14rem;"
          >
          <span class="text-red-500">Recommandations: <br></span> {{ seg.recommandations }}
          </div>
        </div>

            <img class="mt-5" width="500px"  v-if="!showSuggest" src="https://coeuretsanteblois.fr/wp-content/uploads/2021/08/roue-calcul-imc.png" />

        </div>

    </div>
</template>



<style>
#cont{
    padding-top: 215px ;
    /* padding-bottom: 14px ; */
}
.grid {
  grid-gap: 1rem;
  width: 550px; 
}
</style>



<script setup>

const result = ref("0")
const seg = ref("")
const colorIMC = ref(null)
const showSuggest = ref(false)
const height = ref("")
const weight = ref("")

const requestCalculIMC = async function(){
    const { data : imc } = await useFetch('https://localhost:3299/api/imc', {
        method: 'POST',
        headers: { "Content-type": "application/json" },
        body: {
            height: Number(height.value),
            weight: Number(weight.value)
        }
    })
    
    result.value = Math.round(imc.value.imc)
    seg.value = imc._rawValue.suggestions
    showSuggest.value = true
    console.log(imc._rawValue.suggestions.conseils)

    // if (result.value) {
    //     seg.value = imc.suggestions
    //     showSuggest.value = imc.suggestions.length > 0
    // }


    if ( Number(result.value) <= 18.5 ) colorIMC.value = "text-[#29C5F6]" 
    else if ( Number(result.value) > 18.5 && Number(result.value) <= 25 ) colorIMC.value = "text-[#07DA63]"
    else if ( Number(result.value) > 25 && Number(result.value) <= 30  ) colorIMC.value = "text-[#FFFF00]"
    else if ( Number(result.value) > 30 && Number(result.value) <= 35  ) colorIMC.value = "text-[#FBB124]"
    else if ( Number(result.value) > 35 && Number(result.value) <= 40  ) colorIMC.value = "text-[#ff9200]"
    else if ( Number(result.value) > 40  ) colorIMC.value = "text-[#ED3419]"

     
}

</script>