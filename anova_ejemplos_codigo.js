// Ejemplos de código R y Python para ANOVA

// ============================================================
// EJEMPLOS EN R
// ============================================================

function cargarREjemplos() {
    document.getElementById('r-ejemplos').innerHTML = `
        <div class="card">
            <h2>📘 ANOVA en R</h2>
            
            <h3>⚖️ Ejemplo 1: Diseño Balanceado en R</h3>
            <div class="r-box">
                <h4>Datos: Rendimiento de Fertilizantes</h4>
                <div class="code-block"><pre><code class="language-r"># Crear los datos
fertilizante_A <- c(5.2, 5.5, 5.1, 5.4, 5.3)
fertilizante_B <- c(6.1, 6.3, 5.9, 6.2, 6.0)
fertilizante_C <- c(7.3, 7.1, 7.5, 7.2, 7.4)

# Método 1: Usando vectores separados y stack()
datos <- data.frame(
  rendimiento = c(fertilizante_A, fertilizante_B, fertilizante_C),
  fertilizante = factor(rep(c("A", "B", "C"), each = 5))
)

# Ver estructura de datos
head(datos)
#   rendimiento fertilizante
# 1         5.2            A
# 2         5.5            A
# 3         5.1            A
# ...

# Verificar balanceo
table(datos$fertilizante)
# A B C 
# 5 5 5  <- Diseño BALANCEADO ✓
</code></pre></div>
            </div>
            
            <div class="r-box">
                <h4>Realizar ANOVA en R</h4>
                <div class="code-block"><pre><code class="language-r"># Ajustar modelo ANOVA
modelo <- aov(rendimiento ~ fertilizante, data = datos)

# Ver tabla ANOVA
summary(modelo)

# Salida:
#                  Df Sum Sq Mean Sq F value   Pr(>F)    
# fertilizante      2  10.13   5.065  178.75  1.1e-09 ***
# Residuals        12   0.34   0.028                     
# ---
# Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1

# Estadísticas descriptivas por grupo
library(dplyr)
datos %>%
  group_by(fertilizante) %>%
  summarise(
    n = n(),
    media = mean(rendimiento),
    sd = sd(rendimiento),
    varianza = var(rendimiento)
  )

#   fertilizante     n media    sd varianza
# 1 A                5  5.30 0.158    0.025
# 2 B                5  6.10 0.158    0.025
# 3 C                5  7.30 0.158    0.025
</code></pre></div>
            </div>
            
            <div class="r-box">
                <h4>Verificación de Supuestos en R</h4>
                <div class="code-block"><pre><code class="language-r"># 1. Normalidad (test de Shapiro-Wilk)
shapiro.test(residuals(modelo))
# p-value > 0.05 → Los residuos son normales ✓

# 2. Homocedasticidad (test de Levene)
library(car)
leveneTest(rendimiento ~ fertilizante, data = datos)
# p-value > 0.05 → Varianzas homogéneas ✓

# 3. Gráficos diagnóstico
par(mfrow = c(2, 2))
plot(modelo)
# - Residuos vs ajustados: sin patrón
# - Q-Q plot: puntos sobre la línea
# - Scale-Location: horizontal
# - Residuos vs leverage: sin outliers
</code></pre></div>
            </div>
            
            <div class="r-box">
                <h4>Comparaciones Múltiples (Post-hoc)</h4>
                <div class="code-block"><pre><code class="language-r"># Test de Tukey HSD (Honestly Significant Difference)
TukeyHSD(modelo, conf.level = 0.95)

#   Tukey multiple comparisons of means
#     95% family-wise confidence level
# 
# $fertilizante
#           diff       lwr       upr     p adj
# B-A  0.8000000  0.491239  1.108761 0.000034
# C-A  2.0000000  1.691239  2.308761 0.000000
# C-B  1.2000000  0.891239  1.508761 0.000002

# Todas las comparaciones son significativas (p < 0.05)
# C > B > A en rendimiento

# Visualizar
plot(TukeyHSD(modelo))
</code></pre></div>
            </div>
            
            <h3>📊 Ejemplo 2: Diseño No Balanceado en R</h3>
            <div class="r-box">
                <h4>Datos: Tiempos de Recuperación (tamaños diferentes)</h4>
                <div class="code-block"><pre><code class="language-r"># Crear datos no balanceados
datos_nb <- data.frame(
  tiempo = c(10, 12, 11, 13, 10, 12,  # Trat A: n=6
             8, 9, 7, 8,                # Trat B: n=4
             14, 15, 13, 14, 16),       # Trat C: n=5
  tratamiento = factor(c(rep("A", 6), rep("B", 4), rep("C", 5)))
)

# Verificar tamaños
table(datos_nb$tratamiento)
# A B C 
# 6 4 5  <- Diseño NO BALANCEADO ⚠️

# ANOVA (R maneja automáticamente el desbalanceo)
modelo_nb <- aov(tiempo ~ tratamiento, data = datos_nb)
summary(modelo_nb)

#              Df Sum Sq Mean Sq F value   Pr(>F)    
# tratamiento   2  91.20   45.60   37.58 1.13e-05 ***
# Residuals    12  14.56    1.21                     

# Estadísticas por grupo
datos_nb %>%
  group_by(tratamiento) %>%
  summarise(
    n = n(),
    media = mean(tiempo),
    sd = sd(tiempo)
  )

#   tratamiento     n media    sd
# 1 A               6 11.33  1.21
# 2 B               4  8.00  0.82
# 3 C               5 14.40  1.14

# Comparaciones múltiples
TukeyHSD(modelo_nb)
</code></pre></div>
            </div>
            
            <div class="r-box">
                <h4>Visualización en R</h4>
                <div class="code-block"><pre><code class="language-r"># Boxplot comparativo
boxplot(rendimiento ~ fertilizante, data = datos,
        main = "Comparación de Fertilizantes",
        xlab = "Fertilizante",
        ylab = "Rendimiento (ton/ha)",
        col = c("lightblue", "lightgreen", "lightyellow"))

# Gráfico de medias con intervalos de confianza
library(ggplot2)
ggplot(datos, aes(x = fertilizante, y = rendimiento, fill = fertilizante)) +
  stat_summary(fun = mean, geom = "bar") +
  stat_summary(fun.data = mean_cl_normal, geom = "errorbar", width = 0.2) +
  labs(title = "Medias por Fertilizante",
       x = "Fertilizante",
       y = "Rendimiento (ton/ha)") +
  theme_minimal()
</code></pre></div>
            </div>
        </div>
    `;
    
    // Highlight code
    if (typeof hljs !== 'undefined') {
        document.querySelectorAll('#r-ejemplos pre code').forEach((block) => {
            hljs.highlightElement(block);
        });
    }
}

// ============================================================
// EJEMPLOS EN PYTHON
// ============================================================

function cargarPythonEjemplos() {
    document.getElementById('python-ejemplos').innerHTML = `
        <div class="card">
            <h2>🐍 ANOVA en Python</h2>
            
            <h3>⚖️ Ejemplo 1: Diseño Balanceado en Python</h3>
            <div class="python-box">
                <h4>Instalación de Librerías</h4>
                <div class="code-block"><pre><code class="language-python"># Instalar librerías necesarias
# pip install scipy pandas numpy statsmodels matplotlib seaborn
</code></pre></div>
            </div>
            
            <div class="python-box">
                <h4>Preparar Datos y Realizar ANOVA</h4>
                <div class="code-block"><pre><code class="language-python">import numpy as np
import pandas as pd
from scipy import stats
import matplotlib.pyplot as plt
import seaborn as sns

# Crear datos (diseño balanceado)
fertilizante_A = [5.2, 5.5, 5.1, 5.4, 5.3]
fertilizante_B = [6.1, 6.3, 5.9, 6.2, 6.0]
fertilizante_C = [7.3, 7.1, 7.5, 7.2, 7.4]

# Método 1: Usando scipy.stats.f_oneway (más simple)
f_stat, p_value = stats.f_oneway(fertilizante_A, fertilizante_B, fertilizante_C)

print(f"Estadístico F: {f_stat:.4f}")
print(f"Valor-p: {p_value:.6f}")

# Salida:
# Estadístico F: 178.7500
# Valor-p: 0.000000

# Método 2: Usando pandas y statsmodels (más completo)
import statsmodels.api as sm
from statsmodels.formula.api import ols

# Crear DataFrame
datos = pd.DataFrame({
    'rendimiento': fertilizante_A + fertilizante_B + fertilizante_C,
    'fertilizante': ['A']*5 + ['B']*5 + ['C']*5
})

# Ver datos
print(datos.head())
#    rendimiento fertilizante
# 0          5.2            A
# 1          5.5            A
# 2          5.1            A

# Verificar balanceo
print(datos['fertilizante'].value_counts())
# A    5
# B    5
# C    5
# Diseño BALANCEADO ✓
</code></pre></div>
            </div>
            
            <div class="python-box">
                <h4>Tabla ANOVA Completa con Statsmodels</h4>
                <div class="code-block"><pre><code class="language-python"># Ajustar modelo lineal
modelo = ols('rendimiento ~ C(fertilizante)', data=datos).fit()

# Tabla ANOVA
from statsmodels.stats.anova import anova_lm
tabla_anova = anova_lm(modelo, typ=1)
print(tabla_anova)

#                      df     sum_sq   mean_sq         F    PR(>F)
# C(fertilizante)     2.0  10.133333  5.066667  178.7500  1.11e-09
# Residual           12.0   0.340000  0.028333       NaN       NaN

# Resumen del modelo
print(modelo.summary())

# R-cuadrado
print(f"R²: {modelo.rsquared:.4f}")
# R²: 0.9676
</code></pre></div>
            </div>
            
            <div class="python-box">
                <h4>Estadísticas Descriptivas</h4>
                <div class="code-block"><pre><code class="language-python"># Estadísticas por grupo
descriptivas = datos.groupby('fertilizante')['rendimiento'].agg([
    ('n', 'count'),
    ('media', 'mean'),
    ('std', 'std'),
    ('var', 'var'),
    ('min', 'min'),
    ('max', 'max')
])

print(descriptivas)

#                n  media       std       var  min  max
# fertilizante                                         
# A              5   5.30  0.158114  0.025000  5.1  5.5
# B              5   6.10  0.158114  0.025000  5.9  6.3
# C              5   7.30  0.158114  0.025000  7.1  7.5
</code></pre></div>
            </div>
            
            <h3>📊 Ejemplo 2: Diseño No Balanceado en Python</h3>
            <div class="python-box">
                <h4>Datos con Tamaños Diferentes</h4>
                <div class="code-block"><pre><code class="language-python"># Datos no balanceados
tratamiento_A = [10, 12, 11, 13, 10, 12]      # n = 6
tratamiento_B = [8, 9, 7, 8]                   # n = 4
tratamiento_C = [14, 15, 13, 14, 16]           # n = 5

# Crear DataFrame
datos_nb = pd.DataFrame({
    'tiempo': tratamiento_A + tratamiento_B + tratamiento_C,
    'tratamiento': ['A']*6 + ['B']*4 + ['C']*5
})

# Verificar tamaños
print(datos_nb['tratamiento'].value_counts())
# A    6
# B    4  <- Tamaños DIFERENTES (no balanceado)
# C    5

# ANOVA con scipy
f_stat, p_value = stats.f_oneway(tratamiento_A, tratamiento_B, tratamiento_C)
print(f"F = {f_stat:.4f}, p-value = {p_value:.6f}")
# F = 37.5778, p-value = 0.000011

# ANOVA con statsmodels (recomendado para diseños no balanceados)
modelo_nb = ols('tiempo ~ C(tratamiento)', data=datos_nb).fit()
tabla_anova_nb = anova_lm(modelo_nb, typ=2)  # Tipo II para no balanceado
print(tabla_anova_nb)

#                   sum_sq    df         F    PR(>F)
# C(tratamiento)  91.200000   2.0  37.577778  1.13e-05
# Residual        14.560000  12.0        NaN       NaN
</code></pre></div>
            </div>
            
            <div class="python-box">
                <h4>Verificación de Supuestos en Python</h4>
                <div class="code-block"><pre><code class="language-python"># 1. Test de Normalidad (Shapiro-Wilk)
from scipy.stats import shapiro

residuos = modelo.resid
stat, p_value_shapiro = shapiro(residuos)
print(f"Test Shapiro-Wilk: p-value = {p_value_shapiro:.4f}")
# Si p > 0.05 → Los residuos son normales ✓

# 2. Test de Homocedasticidad (Levene)
from scipy.stats import levene

stat_levene, p_value_levene = levene(
    fertilizante_A, fertilizante_B, fertilizante_C
)
print(f"Test de Levene: p-value = {p_value_levene:.4f}")
# Si p > 0.05 → Varianzas homogéneas ✓

# 3. Gráficos diagnóstico
import matplotlib.pyplot as plt

fig, axes = plt.subplots(2, 2, figsize=(12, 10))

# Q-Q Plot
from scipy.stats import probplot
probplot(residuos, dist="norm", plot=axes[0,0])
axes[0,0].set_title("Q-Q Plot")

# Residuos vs Ajustados
axes[0,1].scatter(modelo.fittedvalues, residuos)
axes[0,1].axhline(y=0, color='r', linestyle='--')
axes[0,1].set_xlabel("Valores Ajustados")
axes[0,1].set_ylabel("Residuos")
axes[0,1].set_title("Residuos vs Ajustados")

# Histograma de residuos
axes[1,0].hist(residuos, bins=10, edgecolor='black')
axes[1,0].set_xlabel("Residuos")
axes[1,0].set_ylabel("Frecuencia")
axes[1,0].set_title("Histograma de Residuos")

# Boxplot por grupo
datos.boxplot(column='rendimiento', by='fertilizante', ax=axes[1,1])
axes[1,1].set_title("Boxplot por Grupo")

plt.tight_layout()
plt.show()
</code></pre></div>
            </div>
            
            <div class="python-box">
                <h4>Comparaciones Post-hoc en Python</h4>
                <div class="code-block"><pre><code class="language-python"># Test de Tukey con statsmodels
from statsmodels.stats.multicomp import pairwise_tukeyhsd

# Realizar comparaciones
tukey = pairwise_tukeyhsd(endog=datos['rendimiento'],
                          groups=datos['fertilizante'],
                          alpha=0.05)

print(tukey)

#   Multiple Comparison of Means - Tukey HSD, FWER=0.05
# =====================================================
# group1 group2 meandiff p-adj   lower   upper  reject
# -----------------------------------------------------
#      A      B     0.80 0.0000  0.4912  1.1088   True
#      A      C     2.00 0.0000  1.6912  2.3088   True
#      B      C     1.20 0.0000  0.8912  1.5088   True
# -----------------------------------------------------

# Visualización
tukey.plot_simultaneous()
plt.show()
</code></pre></div>
            </div>
            
            <div class="python-box">
                <h4>Visualización Avanzada con Seaborn</h4>
                <div class="code-block"><pre><code class="language-python">import seaborn as sns
import matplotlib.pyplot as plt

# Configurar estilo
sns.set_style("whitegrid")

# Gráfico de cajas (Boxplot)
plt.figure(figsize=(10, 6))
sns.boxplot(data=datos, x='fertilizante', y='rendimiento',
            palette='Set2')
sns.swarmplot(data=datos, x='fertilizante', y='rendimiento',
              color='black', alpha=0.5, size=6)
plt.title('Distribución de Rendimiento por Fertilizante', fontsize=14)
plt.ylabel('Rendimiento (ton/ha)')
plt.xlabel('Fertilizante')
plt.show()

# Gráfico de violín
plt.figure(figsize=(10, 6))
sns.violinplot(data=datos, x='fertilizante', y='rendimiento',
               palette='muted')
plt.title('Distribución de Rendimiento por Fertilizante (Violín)', fontsize=14)
plt.show()

# Gráfico de barras con error estándar
plt.figure(figsize=(10, 6))
sns.barplot(data=datos, x='fertilizante', y='rendimiento',
            ci=95, capsize=0.1, palette='deep')
plt.title('Medias con IC 95%', fontsize=14)
plt.ylabel('Rendimiento (ton/ha)')
plt.xlabel('Fertilizante')
plt.show()
</code></pre></div>
            </div>
        </div>
    `;
    
    // Highlight code
    if (typeof hljs !== 'undefined') {
        document.querySelectorAll('#python-ejemplos pre code').forEach((block) => {
            hljs.highlightElement(block);
        });
    }
}

// ============================================================
// INTERPRETACIÓN DE RESULTADOS
// ============================================================

function cargarInterpretacion() {
    document.getElementById('interpretacion').innerHTML = `
        <div class="card">
            <h2>💡 Guía de Interpretación de Resultados</h2>
            
            <h3>📊 Cómo Leer la Tabla ANOVA</h3>
            <div class="example-box">
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
                            <td>Entre grupos</td>
                            <td>⬅️ Variabilidad explicada por grupos</td>
                            <td>k - 1</td>
                            <td>SS/(k-1)</td>
                            <td rowspan="2">⬅️ ¡Clave!</td>
                            <td rowspan="2">⬅️ ¡Decisión!</td>
                        </tr>
                        <tr>
                            <td>Dentro grupos</td>
                            <td>⬅️ Variabilidad no explicada (error)</td>
                            <td>N - k</td>
                            <td>SS/(N-k)</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <h3>🎯 Interpretación del Estadístico F</h3>
            <div class="formula-box">
                <p>\\[F = \\frac{\\text{Variabilidad entre grupos}}{\\text{Variabilidad dentro de grupos}} = \\frac{MSB}{MSW}\\]</p>
                
                <p><strong>Interpretación:</strong></p>
                <ul>
                    <li><strong>F ≈ 1:</strong> La variabilidad entre grupos es similar a la variabilidad dentro de grupos → No hay efecto de grupos</li>
                    <li><strong>F >> 1:</strong> La variabilidad entre grupos es mucho mayor → Hay efecto significativo de grupos</li>
                    <li><strong>F < 1:</strong> Poco común, sugiere problemas con los datos o diseño</li>
                </ul>
            </div>
            
            <h3>📈 Interpretación del Valor-p</h3>
            <div class="result-box">
                <h4>Regla de Decisión:</h4>
                <ul>
                    <li><strong>Si p-value < 0.001:</strong> ⭐⭐⭐ Evidencia muy fuerte de diferencias</li>
                    <li><strong>Si p-value < 0.01:</strong> ⭐⭐ Evidencia fuerte de diferencias</li>
                    <li><strong>Si p-value < 0.05:</strong> ⭐ Evidencia moderada de diferencias</li>
                    <li><strong>Si p-value > 0.05:</strong> ❌ No hay evidencia suficiente</li>
                </ul>
            </div>
            
            <h3>📊 Interpretación de R²</h3>
            <div class="formula-box">
                <p>\\[R^2 = \\frac{SSB}{SST} \\times 100\\%\\]</p>
                
                <table>
                    <thead>
                        <tr><th>Valor R²</th><th>Interpretación</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>R² < 0.1</td><td>El factor explica menos del 10% de la variabilidad</td></tr>
                        <tr><td>0.1 ≤ R² < 0.3</td><td>Efecto pequeño</td></tr>
                        <tr><td>0.3 ≤ R² < 0.5</td><td>Efecto moderado</td></tr>
                        <tr><td>R² ≥ 0.5</td><td>Efecto grande - El factor es importante</td></tr>
                        <tr><td>R² > 0.9</td><td>Efecto muy fuerte - Factor dominante</td></tr>
                    </tbody>
                </table>
            </div>
            
            <h3>⚠️ Errores Comunes de Interpretación</h3>
            <div class="example-box">
                <h4>❌ Errores a Evitar:</h4>
                <ol>
                    <li><strong>"Los grupos son significativamente diferentes"</strong>
                        <br>✅ Correcto: "Al menos un grupo tiene media significativamente diferente"
                        <br>ANOVA no dice CUÁLES son diferentes, solo que existen diferencias</li>
                    
                    <li><strong>"F grande = diferencias grandes"</strong>
                        <br>✅ Correcto: F grande indica diferencias <em>estadísticamente</em> significativas
                        <br>Para magnitud de diferencias, ver R² y diferencias de medias</li>
                    
                    <li><strong>"p < 0.05 = importante prácticamente"</strong>
                        <br>✅ Correcto: p < 0.05 = estadísticamente significativo
                        <br>Importancia práctica se evalúa con tamaños de efecto y contexto</li>
                    
                    <li><strong>Usar ANOVA para 2 grupos</strong>
                        <br>✅ Correcto: Usar t-test para 2 grupos (equivalente, pero más apropiado)</li>
                </ol>
            </div>
            
            <h3>🔍 Pasos Después del ANOVA</h3>
            <div class="python-box">
                <h4>Si rechazas H₀ (hay diferencias):</h4>
                <ol>
                    <li><strong>Comparaciones Post-hoc:</strong>
                        <ul>
                            <li>Test de Tukey HSD</li>
                            <li>Test de Bonferroni</li>
                            <li>Test de Scheffé</li>
                        </ul>
                        Para identificar <em>cuáles</em> grupos son diferentes
                    </li>
                    
                    <li><strong>Tamaño del Efecto:</strong>
                        <ul>
                            <li>Calcular diferencias de medias</li>
                            <li>Calcular d de Cohen o η² (eta cuadrado)</li>
                            <li>Evaluar importancia práctica</li>
                        </ul>
                    </li>
                    
                    <li><strong>Visualización:</strong>
                        <ul>
                            <li>Boxplots comparativos</li>
                            <li>Gráfico de medias con intervalos de confianza</li>
                            <li>Gráficos de interacción si hay múltiples factores</li>
                        </ul>
                    </li>
                </ol>
            </div>
            
            <h3>📚 Reporte de Resultados (Formato APA)</h3>
            <div class="r-box">
                <h4>Ejemplo de Reporte:</h4>
                <p><em>"Se realizó un análisis de varianza de un factor para comparar el efecto de tres fertilizantes (A, B, C) sobre el rendimiento de cultivos de maíz. Los resultados mostraron un efecto significativo del tipo de fertilizante, F(2, 12) = 178.75, p < .001, η² = 0.97. Las comparaciones post-hoc con el test de Tukey HSD indicaron que el Fertilizante C (M = 7.30, SD = 0.16) produjo un rendimiento significativamente mayor que el Fertilizante B (M = 6.10, SD = 0.16), p < .001, y el Fertilizante A (M = 5.30, SD = 0.16), p < .001. Asimismo, el Fertilizante B superó significativamente al Fertilizante A, p < .001."</em></p>
            </div>
            
            <h3>🎓 Consejos Prácticos</h3>
            <div class="example-box">
                <h4>Para Diseños Balanceados:</h4>
                <ul>
                    <li>✅ Preferible cuando sea posible</li>
                    <li>✅ Mayor poder estadístico</li>
                    <li>✅ Más robusto</li>
                    <li>✅ Interpretación más simple</li>
                </ul>
                
                <h4>Para Diseños No Balanceados:</h4>
                <ul>
                    <li>⚠️ Común en datos observacionales</li>
                    <li>⚠️ Verificar supuestos con más cuidado</li>
                    <li>⚠️ Usar ANOVA Tipo II o III en Python (statsmodels)</li>
                    <li>⚠️ Reportar tamaños muestrales</li>
                </ul>
            </div>
        </div>
    `;
}

