<template>
    <div class="bg-gray-200 h-screen w-screen ">
        <div class="text-white text-center flex flex-col justify-center items-center py-64">
            <form method="post" class="bg-gray-600 p-5 rounded-lg ">
                <div>
                    <label for="height">Height</label><br/>
                    <input
                        type="number" class="text-black p-1  rounded-xl" 
                        v-model="height"
                    />
                </div>
                <div>
                    <label for="weight">Weight</label><br/>
                    <input
                        type="number" class="text-black p-1  rounded-xl"
                        v-model="weight"
                    />
                </div>
                <br/>
                <button type="button" @click="requestCalculIMC" class="bg-neutral-700 px-10 py-2 rounded-xl hover:bg-neutral-500">
                    Give IMC
                </button>
            </form>
            <p class="bg-gray-600 mt-2  px-5 py-2"
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
            <img class="mt-5" width="500px" src="https://coeuretsanteblois.fr/wp-content/uploads/2021/08/roue-calcul-imc.png" />

        </div>

    </div>
</template>


<script setup>

const result = ref("0")
const colorIMC = ref(null)

const height = ref("")
const weight = ref("")

const requestCalculIMC = async () => {
    const { data : imc } = await useFetch('http://localhost:3001/api/imc', {
        method: 'POST',
        headers: { "Content-type": "application/json" },
        body: {
            height: Number(height.value),
            weight: Number(weight.value)
        }
    })
    
    result.value = Math.round(imc.value.BMI_Result)


    if ( Number(result.value) <= 18.5 ) colorIMC.value = "text-[#29C5F6]" 
    else if ( Number(result.value) > 18.5 && Number(result.value) <= 25 ) colorIMC.value = "text-[#07DA63]"
    else if ( Number(result.value) > 25 && Number(result.value) <= 30  ) colorIMC.value = "text-[#FFFF00]"
    else if ( Number(result.value) > 30 && Number(result.value) <= 35  ) colorIMC.value = "text-[#FBB124]"
    else if ( Number(result.value) > 35 && Number(result.value) <= 40  ) colorIMC.value = "text-[#ff9200]"
    else if ( Number(result.value) > 40  ) colorIMC.value = "text-[#ED3419]"
}

</script>