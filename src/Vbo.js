phina.namespace(function() {

  phina.define("phigl.Vbo", {

    gl: null,
    usage: null,
    _vbo: null,
    
    array: null,

    init: function(gl, usage) {
      this.gl = gl;
      this.usage = usage || gl.STATIC_DRAW;
      this._vbo = gl.createBuffer();
    },

    set: function(data) {
      var gl = this.gl;
      if (this.array) {
        this.array.set(data);
      } else {
        this.array = new Float32Array(data);
      }
      gl.bindBuffer(gl.ARRAY_BUFFER, this._vbo);
      gl.bufferData(gl.ARRAY_BUFFER, this.array, this.usage);
      gl.bindBuffer(gl.ARRAY_BUFFER, null);
      return this;
    },

    /**
     * [{ unitSize: 3, data: [...] }, { unitSize: 2, data: [...] }]
     */
    setAsInterleavedArray: function(dataArray) {
      var count = dataArray[0].data.length / dataArray[0].unitSize;
      var interleavedArray = [];
      for (var i = 0; i < count; i++) {
        dataArray.forEach(function(d) {
          for (var j = 0; j < d.unitSize; j++) {
            interleavedArray.push(d.data[i * d.unitSize + j]);
          }
        });
      }
      return this.set(interleavedArray);
    },

    bind: function() {
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this._vbo);
      return this;
    },

    _static: {
      unbind: function(gl) {
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
      },
    },

  });
});
