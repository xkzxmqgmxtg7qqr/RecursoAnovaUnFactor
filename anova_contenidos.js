// Contenidos para ANOVA de Un Factor
// Secciones de diseño balanceado, no balanceado y calculadora

// Variables globales para gráficos
let chartAnova = null;

// ============================================================
// DISEÑO BALANCEADO
// ============================================================

function cargarBalanceado() {
    document.getElementById('balanceado').innerHTML = `
        <div class="card">
            <h2>⚖️ ANOVA con Diseño Balanceado</h2>
            
            <h3>📊 Ejemplo Resuelto: Rendimiento de Cultivos</h3>
            <div class="example-box">
                <h4>Contexto:</h4>
                <p>Un agrónomo prueba 3 fertilizantes diferentes en parcelas de maíz. Se seleccionan <strong>5 parcelas</strong> para cada fertilizante (diseño balanceado: n₁ = n₂ = n₃ = 5).</p>
                
                <h4>Datos (Rendimiento en ton/ha):</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Fertilizante A</th>
                            <th>Fertilizante B</th>
                            <th>Fertilizante C</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>5.2</td><td>6.1</td><td>7.3</td></tr>
                        <tr><td>5.5</td><td>6.3</td><td>7.1</td></tr>
                        <tr><td>5.1</td><td>5.9</td><td>7.5</td></tr>
                        <tr><td>5.4</td><td>6.2</td><td>7.2</td></tr>
                        <tr><td>5.3</td><td>6.0</td><td>7.4</td></tr>
                    </tbody>
                </table>
                
                <p><strong>Pregunta:</strong> ¿Existe diferencia significativa en el rendimiento promedio entre los fertilizantes? (α = 0.05)</p>
            </div>
            
            <h3>📐 Solución Paso a Paso</h3>
            
            <h4>Paso 1: Calcular medias por grupo</h4>
            <div class="formula-box">
                <p>\\[\\bar{y}_A = \\frac{5.2 + 5.5 + 5.1 + 5.4 + 5.3}{5} = 5.3\\]</p>
                <p>\\[\\bar{y}_B = \\frac{6.1 + 6.3 + 5.9 + 6.2 + 6.0}{5} = 6.1\\]</p>
                <p>\\[\\bar{y}_C = \\frac{7.3 + 7.1 + 7.5 + 7.2 + 7.4}{5} = 7.3\\]</p>
                <p><strong>Media general:</strong></p>
                <p>\\[\\bar{y}_{..} = \\frac{5.3 + 6.1 + 7.3}{3} = 6.233\\]</p>
            </div>
            
            <h4>Paso 2: Calcular Suma de Cuadrados</h4>
            <div class="formula-box">
                <p><strong>SSB (Entre grupos):</strong></p>
                <p>\\[SSB = 5[(5.3-6.233)^2 + (6.1-6.233)^2 + (7.3-6.233)^2]\\]</p>
                <p>\\[SSB = 5[0.870 + 0.018 + 1.138] = 5 \\times 2.026 = 10.13\\]</p>
                
                <p><strong>SSW (Dentro de grupos):</strong></p>
                <p>Calculado sumando las varianzas dentro de cada grupo:</p>
                <p>\\[SSW = \\sum_{i=1}^{3} \\sum_{j=1}^{5} (y_{ij} - \\bar{y}_i)^2 = 0.34\\]</p>
                
                <p><strong>SST (Total):</strong></p>
                <p>\\[SST = SSB + SSW = 10.13 + 0.34 = 10.47\\]</p>
            </div>
            
            <h4>Paso 3: Construir Tabla ANOVA</h4>
            <table class="anova-table">
                <thead>
                    <tr>
                        <th>Fuente</th>
                        <th>SS</th>
                        <th>df</th>
                        <th>MS</th>
                        <th>F</th>
                        <th>valor-p</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Entre grupos</strong></td>
                        <td>10.13</td>
                        <td>2</td>
                        <td>5.065</td>
                        <td>178.75</td>
                        <td>< 0.001</td>
                    </tr>
                    <tr>
                        <td><strong>Dentro grupos</strong></td>
                        <td>0.34</td>
                        <td>12</td>
                        <td>0.0283</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td><strong>Total</strong></td>
                        <td>10.47</td>
                        <td>14</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                </tbody>
            </table>
            
            <h4>Paso 4: Conclusión</h4>
            <div class="result-box">
                <h4>✅ Conclusión:</h4>
                <p><strong>F calculado = 178.75</strong></p>
                <p><strong>Valor-p < 0.001</strong></p>
                <p><strong>Decisión:</strong> <span class="highlight-value">Rechazamos H₀</span></p>
                <p><strong>Interpretación:</strong> Existe evidencia estadística altamente significativa de que al menos uno de los fertilizantes produce un rendimiento promedio diferente.</p>
                <p><strong>R² = 0.968</strong> → El tipo de fertilizante explica el 96.8% de la variabilidad en rendimiento.</p>
            </div>
            
            <div class="r-box">
                <h4>🎯 Observaciones:</h4>
                <ul>
                    <li>El diseño balanceado (n = 5 en cada grupo) maximiza el poder de la prueba</li>
                    <li>El Fertilizante C claramente tiene mejor rendimiento (7.3 ton/ha)</li>
                    <li>La variabilidad dentro de grupos es muy pequeña</li>
                    <li>La variabilidad entre grupos es muy grande</li>
                </ul>
            </div>
        </div>
    `;
}

// ============================================================
// DISEÑO NO BALANCEADO
// ============================================================

function cargarNoBalanceado() {
    document.getElementById('no-balanceado').innerHTML = `
        <div class="card">
            <h2>📊 ANOVA con Diseño No Balanceado</h2>
            
            <h3>📊 Ejemplo Resuelto: Tiempos de Recuperación</h3>
            <div class="example-box">
                <h4>Contexto:</h4>
                <p>Un estudio médico compara 3 tratamientos para reducir tiempo de recuperación post-cirugía. Debido a abandonos, los grupos tienen tamaños diferentes (diseño no balanceado).</p>
                
                <h4>Datos (Tiempo de recuperación en días):</h4>
                <ul>
                    <li><strong>Tratamiento A (n = 6):</strong> 10, 12, 11, 13, 10, 12</li>
                    <li><strong>Tratamiento B (n = 4):</strong> 8, 9, 7, 8</li>
                    <li><strong>Tratamiento C (n = 5):</strong> 14, 15, 13, 14, 16</li>
                </ul>
                
                <p><strong>Tamaños muestrales:</strong> n₁ = 6, n₂ = 4, n₃ = 5 (N = 15)</p>
            </div>
            
            <h3>📐 Solución Paso a Paso</h3>
            
            <h4>Paso 1: Calcular medias ponderadas</h4>
            <div class="formula-box">
                <table>
                    <thead>
                        <tr><th>Grupo</th><th>n</th><th>Media</th><th>Varianza</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>Tratamiento A</td><td>6</td><td>11.33</td><td>1.47</td></tr>
                        <tr><td>Tratamiento B</td><td>4</td><td>8.00</td><td>0.67</td></tr>
                        <tr><td>Tratamiento C</td><td>5</td><td>14.40</td><td>1.30</td></tr>
                    </tbody>
                </table>
                
                <p><strong>Media general (ponderada):</strong></p>
                <p>\\[\\bar{y}_{..} = \\frac{6(11.33) + 4(8.00) + 5(14.40)}{15} = \\frac{172}{15} = 11.47\\]</p>
                <p><em>Nota: NO es el promedio simple de las medias grupales debido al desbalanceo</em></p>
            </div>
            
            <h4>Paso 2: Calcular Suma de Cuadrados</h4>
            <div class="formula-box">
                <p><strong>SSB (con ponderación):</strong></p>
                <p>\\[SSB = 6(11.33-11.47)^2 + 4(8.00-11.47)^2 + 5(14.40-11.47)^2\\]</p>
                <p>\\[SSB = 0.12 + 48.16 + 42.92 = 91.20\\]</p>
                
                <p><strong>SSW:</strong></p>
                <p>\\[SSW = 5(1.47) + 3(0.67) + 4(1.30) = 14.56\\]</p>
            </div>
            
            <h4>Paso 3: Tabla ANOVA</h4>
            <table class="anova-table">
                <thead>
                    <tr>
                        <th>Fuente</th>
                        <th>SS</th>
                        <th>df</th>
                        <th>MS</th>
                        <th>F</th>
                        <th>valor-p</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Entre grupos</strong></td>
                        <td>91.20</td>
                        <td>2</td>
                        <td>45.60</td>
                        <td>37.58</td>
                        <td>< 0.001</td>
                    </tr>
                    <tr>
                        <td><strong>Dentro grupos</strong></td>
                        <td>14.56</td>
                        <td>12</td>
                        <td>1.213</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td><strong>Total</strong></td>
                        <td>105.76</td>
                        <td>14</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                </tbody>
            </table>
            
            <h4>Paso 4: Decisión</h4>
            <div class="result-box">
                <h4>✅ Resultado:</h4>
                <p><strong>F = 37.58, valor-p < 0.001</strong></p>
                <p><strong>Decisión:</strong> <span class="highlight-value">Rechazamos H₀</span></p>
                <p><strong>Conclusión:</strong> Hay diferencias significativas entre los tratamientos.</p>
                <p><strong>R² = 91.20/105.76 = 0.862</strong> → Los tratamientos explican el 86.2% de la variabilidad.</p>
            </div>
            
            <div class="python-box">
                <h4>⚠️ Diferencias Clave en Diseño No Balanceado:</h4>
                <ul>
                    <li><strong>Media general ponderada:</strong> Los grupos con más observaciones tienen más peso</li>
                    <li><strong>Suma de medias grupales ≠ Media general:</strong> No puedes simplemente promediar las medias</li>
                    <li><strong>Sensibilidad a homocedasticidad:</strong> Más sensible a violaciones de igualdad de varianzas</li>
                    <li><strong>Software:</strong> R y Python manejan automáticamente la ponderación correcta</li>
                </ul>
            </div>
        </div>
    `;
}



// ============================================================
// CALCULADORA ANOVA
// ============================================================

function cargarCalculadora() {
    document.getElementById('calculadora').innerHTML = `
        <div class="card">
            <h2>🧮 Calculadora ANOVA Interactiva</h2>
            <p>Ingresa los datos de cada grupo (separa valores con comas)</p>
            
            <div class="interactive-section">
                <div class="input-group">
                    <label>Número de grupos (k):</label>
                    <select id="num-grupos" onchange="actualizarInputs()">
                        <option value="2">2 grupos</option>
                        <option value="3" selected>3 grupos</option>
                        <option value="4">4 grupos</option>
                        <option value="5">5 grupos</option>
                    </select>
                </div>
                
                <div id="grupos-inputs"></div>
                
                <div style="text-align: center; margin: 20px 0;">
                    <button class="btn" onclick="calcularANOVA()">📊 Calcular ANOVA</button>
                    <button class="btn btn-r" onclick="ejemploBalanceado()">⚖️ Ejemplo Balanceado</button>
                    <button class="btn btn-python" onclick="ejemploNoBalanceado()">📊 Ejemplo No Balanceado</button>
                </div>
            </div>
            
            <div id="resultado-anova" style="display:none;"></div>
            <div class="chart-container" style="display:none;" id="chart-anova-container">
                <canvas id="chart-anova"></canvas>
            </div>
        </div>
    `;
    
    actualizarInputs();
}

function actualizarInputs() {
    const numGrupos = parseInt(document.getElementById('num-grupos').value);
    const container = document.getElementById('grupos-inputs');
    
    let html = '';
    for (let i = 1; i <= numGrupos; i++) {
        html += `
            <div class="input-group">
                <label>Grupo ${i} - Nombre:</label>
                <input type="text" id="nombre-grupo-${i}" placeholder="Ej: Tratamiento ${String.fromCharCode(64 + i)}" value="Grupo ${i}">
            </div>
            <div class="input-group">
                <label>Grupo ${i} - Datos (separados por comas):</label>
                <input type="text" id="datos-grupo-${i}" placeholder="Ej: 5.2, 5.5, 5.1, 5.4, 5.3">
            </div>
        `;
    }
    
    container.innerHTML = html;
}

function calcularANOVA() {
    try {
        const numGrupos = parseInt(document.getElementById('num-grupos').value);
        
        // Obtener datos de cada grupo
        const grupos = [];
        const nombres = [];
        
        for (let i = 1; i <= numGrupos; i++) {
            const nombre = document.getElementById(`nombre-grupo-${i}`).value || `Grupo ${i}`;
            const datosStr = document.getElementById(`datos-grupo-${i}`).value;
            
            if (!datosStr.trim()) {
                alert(`⚠️ Por favor ingresa datos para ${nombre}`);
                return;
            }
            
            const datos = datosStr.split(',').map(x => parseFloat(x.trim())).filter(x => !isNaN(x));
            
            if (datos.length < 2) {
                alert(`⚠️ ${nombre} debe tener al menos 2 observaciones`);
                return;
            }
            
            grupos.push(datos);
            nombres.push(nombre);
        }
        
        // Realizar ANOVA
        const resultados = realizarANOVA(grupos, nombres);
        
        // Mostrar resultados
        mostrarResultadosANOVA(resultados, nombres);
        
        // Graficar
        graficarANOVA(grupos, nombres, resultados);
        
    } catch (error) {
        alert('Error al calcular ANOVA: ' + error.message);
        console.error(error);
    }
}

function realizarANOVA(grupos, nombres) {
    // Calcular tamaños y medias
    const n_i = grupos.map(g => g.length);
    const N = n_i.reduce((a, b) => a + b, 0);
    const k = grupos.length;
    
    // Medias por grupo
    const medias = grupos.map(g => g.reduce((a, b) => a + b, 0) / g.length);
    
    // Media general (ponderada)
    const mediaGeneral = grupos.flat().reduce((a, b) => a + b, 0) / N;
    
    // SSB (Suma de cuadrados entre grupos)
    let SSB = 0;
    for (let i = 0; i < k; i++) {
        SSB += n_i[i] * Math.pow(medias[i] - mediaGeneral, 2);
    }
    
    // SSW (Suma de cuadrados dentro de grupos)
    let SSW = 0;
    for (let i = 0; i < k; i++) {
        for (let j = 0; j < grupos[i].length; j++) {
            SSW += Math.pow(grupos[i][j] - medias[i], 2);
        }
    }
    
    // SST (Suma de cuadrados total)
    const SST = SSB + SSW;
    
    // Grados de libertad
    const df_between = k - 1;
    const df_within = N - k;
    const df_total = N - 1;
    
    // Cuadrados medios
    const MSB = SSB / df_between;
    const MSW = SSW / df_within;
    
    // Estadístico F
    const F = MSB / MSW;
    
    // R cuadrado
    const R2 = SSB / SST;
    
    // Varianzas y desviaciones estándar por grupo
    const varianzas = grupos.map((g, i) => {
        const suma = g.reduce((acc, val) => acc + Math.pow(val - medias[i], 2), 0);
        return suma / (g.length - 1);
    });
    
    const desvEst = varianzas.map(v => Math.sqrt(v));
    
    // Determinar si es balanceado
    const esBalanceado = n_i.every(n => n === n_i[0]);
    
    return {
        grupos, nombres, n_i, N, k,
        medias, mediaGeneral,
        SSB, SSW, SST,
        df_between, df_within, df_total,
        MSB, MSW, F, R2,
        varianzas, desvEst,
        esBalanceado
    };
}

function mostrarResultadosANOVA(r, nombres) {
    const resultado = document.getElementById('resultado-anova');
    
    // Crear tabla de estadísticas descriptivas
    let tablaDesc = '<table><thead><tr><th>Grupo</th><th>n</th><th>Media</th><th>Desv. Est.</th><th>Varianza</th></tr></thead><tbody>';
    for (let i = 0; i < r.k; i++) {
        tablaDesc += `<tr>
            <td><strong>${nombres[i]}</strong></td>
            <td>${r.n_i[i]}</td>
            <td>${r.medias[i].toFixed(4)}</td>
            <td>${r.desvEst[i].toFixed(4)}</td>
            <td>${r.varianzas[i].toFixed(4)}</td>
        </tr>`;
    }
    tablaDesc += `<tr style="background:#f0f0f0;">
        <td><strong>Total/General</strong></td>
        <td>${r.N}</td>
        <td>${r.mediaGeneral.toFixed(4)}</td>
        <td>-</td>
        <td>-</td>
    </tr></tbody></table>`;
    
    // Crear tabla ANOVA
    let tablaANOVA = `
        <table class="anova-table">
            <thead>
                <tr>
                    <th>Fuente de Variación</th>
                    <th>SS</th>
                    <th>df</th>
                    <th>MS</th>
                    <th>F</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>Entre grupos</strong></td>
                    <td>${r.SSB.toFixed(4)}</td>
                    <td>${r.df_between}</td>
                    <td>${r.MSB.toFixed(4)}</td>
                    <td>${r.F.toFixed(4)}</td>
                </tr>
                <tr>
                    <td><strong>Dentro grupos (Error)</strong></td>
                    <td>${r.SSW.toFixed(4)}</td>
                    <td>${r.df_within}</td>
                    <td>${r.MSW.toFixed(4)}</td>
                    <td>-</td>
                </tr>
                <tr style="background:#f0f0f0;">
                    <td><strong>Total</strong></td>
                    <td>${r.SST.toFixed(4)}</td>
                    <td>${r.df_total}</td>
                    <td>-</td>
                    <td>-</td>
                </tr>
            </tbody>
        </table>
    `;
    
    // Interpretación
    let interpretacion = '';
    const F_critico_05 = estimarFCritico(r.df_between, r.df_within, 0.05);
    const F_critico_01 = estimarFCritico(r.df_between, r.df_within, 0.01);
    
    if (r.F > F_critico_01) {
        interpretacion = '<p style="color: green; font-weight: bold;">✅ Evidencia MUY FUERTE de diferencias entre grupos (F > F₀.₀₁)</p>';
    } else if (r.F > F_critico_05) {
        interpretacion = '<p style="color: green; font-weight: bold;">✅ Evidencia significativa de diferencias entre grupos (F > F₀.₀₅)</p>';
    } else {
        interpretacion = '<p style="color: orange; font-weight: bold;">⚠️ No hay evidencia suficiente de diferencias entre grupos (F < F₀.₀₅)</p>';
    }
    
    resultado.innerHTML = `
        <div class="result-box">
            <h3>📊 Resultados del ANOVA</h3>
            
            <div class="example-box">
                <h4>Tipo de Diseño:</h4>
                <p>${r.esBalanceado ? 
                    '<span class="badge-balanced">Balanceado</span> - Todos los grupos tienen el mismo tamaño' : 
                    '<span class="badge-unbalanced">No Balanceado</span> - Los grupos tienen tamaños diferentes'
                }</p>
                <p><strong>Número de grupos:</strong> k = ${r.k}</p>
                <p><strong>Tamaño total:</strong> N = ${r.N}</p>
            </div>
            
            <h4>📋 Estadísticas Descriptivas por Grupo:</h4>
            ${tablaDesc}
            
            <h4>📊 Tabla ANOVA:</h4>
            ${tablaANOVA}
            
            <div class="formula-box">
                <h4>📈 Métricas Adicionales:</h4>
                <p><strong>Coeficiente de Determinación:</strong> R² = ${r.R2.toFixed(4)} (${(r.R2*100).toFixed(2)}%)</p>
                <p><strong>Interpretación R²:</strong> El factor (grupo) explica el ${(r.R2*100).toFixed(2)}% de la variabilidad total en los datos.</p>
                <p><strong>F crítico (α=0.05):</strong> F₀.₀₅,${r.df_between},${r.df_within} ≈ ${F_critico_05.toFixed(3)}</p>
                <p><strong>F crítico (α=0.01):</strong> F₀.₀₁,${r.df_between},${r.df_within} ≈ ${F_critico_01.toFixed(3)}</p>
            </div>
            
            <div class="result-box" style="border-color: ${r.F > F_critico_05 ? 'var(--success-color)' : 'var(--warning-color)'};">
                <h3>🎯 Conclusión Estadística:</h3>
                ${interpretacion}
                <p><strong>Estadístico F:</strong> F = ${r.F.toFixed(4)}</p>
                <p><strong>Valor-p estimado:</strong> ${r.F > F_critico_01 ? '< 0.01' : r.F > F_critico_05 ? '< 0.05' : '> 0.05'}</p>
                
                <h4 style="margin-top: 20px;">📝 Interpretación:</h4>
                <p>${r.F > F_critico_05 ? 
                    `Rechazamos la hipótesis nula. Existe evidencia estadística de que <strong>al menos un grupo tiene una media significativamente diferente</strong> de los demás.` :
                    `No rechazamos la hipótesis nula. No hay evidencia suficiente para afirmar que los grupos tienen medias diferentes.`
                }</p>
            </div>
        </div>
    `;
    
    resultado.style.display = 'block';
    
    // Re-renderizar MathJax
    if (typeof MathJax !== 'undefined') {
        MathJax.typesetPromise([resultado]);
    }
}

function estimarFCritico(df1, df2, alpha) {
    // Tabla simplificada de valores F críticos
    const fTable = {
        '1,10': {0.05: 4.96, 0.01: 10.04},
        '1,12': {0.05: 4.75, 0.01: 9.33},
        '1,15': {0.05: 4.54, 0.01: 8.68},
        '1,20': {0.05: 4.35, 0.01: 8.10},
        '2,10': {0.05: 4.10, 0.01: 7.56},
        '2,12': {0.05: 3.89, 0.01: 6.93},
        '2,15': {0.05: 3.68, 0.01: 6.36},
        '2,20': {0.05: 3.49, 0.01: 5.85},
        '3,10': {0.05: 3.71, 0.01: 6.55},
        '3,12': {0.05: 3.49, 0.01: 5.95},
        '3,15': {0.05: 3.29, 0.01: 5.42},
        '3,20': {0.05: 3.10, 0.01: 4.94},
        '4,10': {0.05: 3.48, 0.01: 5.99},
        '4,12': {0.05: 3.26, 0.01: 5.41},
        '4,15': {0.05: 3.06, 0.01: 4.89},
        '4,20': {0.05: 2.87, 0.01: 4.43}
    };
    
    const key = `${df1},${df2}`;
    if (fTable[key] && fTable[key][alpha]) {
        return fTable[key][alpha];
    }
    
    // Aproximación si no está en tabla
    if (alpha === 0.05) return 3.5;
    if (alpha === 0.01) return 6.0;
    return 3.0;
}

function graficarANOVA(grupos, nombres, resultados) {
    const container = document.getElementById('chart-anova-container');
    container.style.display = 'block';
    
    if (chartAnova) {
        chartAnova.destroy();
    }
    
    // Preparar datos para boxplot simulado con barras de error
    const datasets = [{
        label: 'Medias por Grupo',
        data: resultados.medias,
        backgroundColor: 'rgba(192, 57, 43, 0.6)',
        borderColor: 'rgba(192, 57, 43, 1)',
        borderWidth: 2
    }];
    
    const ctx = document.getElementById('chart-anova').getContext('2d');
    
    chartAnova = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: nombres,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: `Comparación de Medias - F = ${resultados.F.toFixed(2)}`,
                    font: { size: 16, weight: 'bold' }
                },
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Media'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Grupos'
                    }
                }
            }
        }
    });
}

function ejemploBalanceado() {
    document.getElementById('num-grupos').value = '3';
    actualizarInputs();
    
    document.getElementById('nombre-grupo-1').value = 'Fertilizante A';
    document.getElementById('datos-grupo-1').value = '5.2, 5.5, 5.1, 5.4, 5.3';
    
    document.getElementById('nombre-grupo-2').value = 'Fertilizante B';
    document.getElementById('datos-grupo-2').value = '6.1, 6.3, 5.9, 6.2, 6.0';
    
    document.getElementById('nombre-grupo-3').value = 'Fertilizante C';
    document.getElementById('datos-grupo-3').value = '7.3, 7.1, 7.5, 7.2, 7.4';
    
    calcularANOVA();
}

function ejemploNoBalanceado() {
    document.getElementById('num-grupos').value = '3';
    actualizarInputs();
    
    document.getElementById('nombre-grupo-1').value = 'Tratamiento A';
    document.getElementById('datos-grupo-1').value = '10, 12, 11, 13, 10, 12';
    
    document.getElementById('nombre-grupo-2').value = 'Tratamiento B';
    document.getElementById('datos-grupo-2').value = '8, 9, 7, 8';
    
    document.getElementById('nombre-grupo-3').value = 'Tratamiento C';
    document.getElementById('datos-grupo-3').value = '14, 15, 13, 14, 16';
    
    calcularANOVA();
}

