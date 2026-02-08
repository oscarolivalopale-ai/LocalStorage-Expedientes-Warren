// Encabezado
const ap1 = Vue.createApp({
    data(){
        return {
            titulo: 'Museo Warren',
            nombre: 'Oscar.',
            subtitulo: 'Objetos más Malditos'
        }
    }
});
ap1.mount('#encabezado');


// Nivel de riesgo por tocar
const ap2 = Vue.createApp({
  data() {
    return {
      minimo: 5,
      seleccionados: [],
      objetos: [
        {nombre: "Desconocido", puntuacion: 7, descripcion: "Objeto de riesgo moderado",fechaAdquisicion: new Date(1890,0,1), ultimaLimpieza: new Date(2022,1,10)},{nombre: "Robert", puntuacion: 8, descripcion: "Puede causar sucesos extraños",fechaAdquisicion: new Date(1904,0,1), ultimaLimpieza: new Date(2021,5,20)},
        {nombre: "Vestido", puntuacion: 9, descripcion: "Nada recomendable",fechaAdquisicion: new Date(1914,0,1), ultimaLimpieza: new Date(2024,3,15)},
        {nombre: "Anabelle", puntuacion: 10, descripcion: "Peligro extremo",fechaAdquisicion: new Date(1970,0,1), ultimaLimpieza: new Date(2020,8,1)}
      ]
    };
  },
  computed: {
    peoresObjetos() {
      return this.objetos.filter(objeto => objeto.puntuacion >= this.minimo);
    }
  },
  methods:{
    seleccionar(objeto){
      this.seleccionados.push({
        nombre: objeto.nombre,
        puntuacion: objeto.puntuacion,
        descripcion: objeto.descripcion,
        fechaAdquisicion: objeto.fechaAdquisicion,
        ultimaLimpieza: objeto.ultimaLimpieza
      });
      },
    imprimirSeleccion(){
      localStorage.setItem(
        'objetosMalditos',
        JSON.stringify(this.seleccionados)
      );
      window.open('imprimir.html');
    }
  }
});
ap2.mount('#articulo1');


// Inventario con fechas Date
const ap3 = Vue.createApp({
  data(){
    return{
      buscar:'',
      objetos:[
        {nombre:"Desconocido",nivel:7,fechaAdquisicion: new Date(1890,0,1),ultimaLimpieza: new Date(2022,1,10)},
        {
          nombre:"Robert",nivel:8,fechaAdquisicion: new Date(1904,0,1),ultimaLimpieza: new Date(2021,5,20)},
        {nombre:"Vestido",nivel:9,fechaAdquisicion: new Date(1914,0,1),ultimaLimpieza: new Date(2024,3,15)},
        {nombre:"Anabelle",nivel:10,fechaAdquisicion: new Date(1970,0,1),ultimaLimpieza: new Date(2020,8,1)}
      ]
    }
  },
  computed:{
    objetosOrdenados(){
      return [...this.objetos].sort(
        (a,b) => a.fechaAdquisicion - b.fechaAdquisicion
      );
    },
    objetosFiltrados(){
      const hoy = new Date();
      const haceUnAno = new Date();
      haceUnAno.setFullYear(hoy.getFullYear() - 1);

      return this.objetosOrdenados.filter(objeto =>
        objeto.ultimaLimpieza < haceUnAno &&
        objeto.nombre.toLowerCase().includes(this.buscar.toLowerCase())
      );
  }
   },
  methods:{
    seleccionar(objeto){
      const seleccionados = JSON.parse(localStorage.getItem('objetosMalditos')) || [];
      seleccionados.push({
        nombre: objeto.nombre,
        puntuacion: objeto.nivel,
        fechaAdquisicion: objeto.fechaAdquisicion,
        ultimaLimpieza: objeto.ultimaLimpieza
      });
      localStorage.setItem('objetosMalditos', JSON.stringify(seleccionados));
      window.open('imprimir.html');
  }
  }
});
ap3.mount('#articulo2');


// Footer
const ap4 = Vue.createApp({
  data(){
     return {
         nombre: 'Alejandro.',
         mensaje:'Hoy es: ' + new Date().toLocaleString()
     }
  }
});
ap4.mount('#divfooter');
