---
layout: post
title: "Decomposição em Valores Singulares (SVD): A Fatoração Universal"
date: 2024-02-01 10:00:00 -0300
categories: [algebra-linear]
tags: [svd, álgebra-linear, pca, decomposição]
description: "SVD é a fatoração mais importante da álgebra linear. Entenda a teoria e suas aplicações em ML."
reading_time: 10
---

A **Decomposição em Valores Singulares** (SVD) é talvez a fatoração matricial mais poderosa
e ubíqua em toda a matemática aplicada e Machine Learning.

## Definição

Toda matriz $A \in \mathbb{R}^{m \times n}$ pode ser escrita como:

$$A = U \Sigma V^\top$$

onde:
- $U \in \mathbb{R}^{m \times m}$ — matriz ortogonal (vetores singulares esquerdos)
- $\Sigma \in \mathbb{R}^{m \times n}$ — matriz diagonal com $\sigma_1 \geq \sigma_2 \geq \cdots \geq \sigma_r \geq 0$
- $V \in \mathbb{R}^{n \times n}$ — matriz ortogonal (vetores singulares direitos)

Os $\sigma_i$ são chamados de **valores singulares** de $A$.

## Intuição Geométrica

A SVD decompõe qualquer transformação linear em três operações simples:

1. **$V^\top$**: rotação/reflexão no espaço de entrada
2. **$\Sigma$**: escalonamento ao longo de eixos coordenados
3. **$U$**: rotação/reflexão no espaço de saída

Geometricamente, $A$ transforma a **hiperesfera unitária** em um **hiperelipsoide**,
cujos semi-eixos têm comprimentos $\sigma_1, \sigma_2, \ldots, \sigma_r$.

## Existência e Unicidade

**Teorema:** Toda matriz real $A \in \mathbb{R}^{m \times n}$ possui uma SVD.

**Prova:** Considere $A^\top A \in \mathbb{R}^{n \times n}$, que é simétrica positiva semidefinida.
Pelo teorema espectral, existe uma diagonalização ortogonal:

$$A^\top A = V \Lambda V^\top$$

onde $\Lambda = \text{diag}(\lambda_1, \ldots, \lambda_n)$ com $\lambda_i \geq 0$.

Defina $\sigma_i = \sqrt{\lambda_i}$ e $\Sigma$ como a matriz de valores singulares.
Para $\sigma_i > 0$, defina $u_i = \frac{1}{\sigma_i} A v_i$.

Pode-se verificar que $\{u_i\}$ são ortonormais e que $A = U\Sigma V^\top$. $\square$

## Melhor Aproximação de Posto $k$

Um dos resultados mais importantes é o **Teorema de Eckart-Young**:

$$\min_{\text{rank}(B) \leq k} \|A - B\|_F = \|A - A_k\|_F = \sqrt{\sum_{i=k+1}^{r} \sigma_i^2}$$

onde $A_k = \sum_{i=1}^{k} \sigma_i u_i v_i^\top$ é a **truncated SVD**.

Isso significa que $A_k$ é a **melhor aproximação de posto $k$** de $A$ na norma de Frobenius!

## Relação com PCA

O PCA (Análise de Componentes Principais) é essencialmente uma SVD.

Dada uma matriz de dados centrada $X \in \mathbb{R}^{n \times d}$:

$$X = U\Sigma V^\top$$

As **componentes principais** são as colunas de $V$ (autovetores de $X^\top X$).
A variância explicada pela $k$-ésima componente é $\sigma_k^2 / \sum_i \sigma_i^2$.

## Aplicações em ML

| Aplicação | Como usa SVD |
|-----------|-------------|
| PCA | Truncated SVD da matriz de dados |
| Sistemas de recomendação | Fatoração matricial baixo posto |
| Compressão de imagens | Aproximação de posto $k$ |
| Solução de sistemas | Pseudo-inversa via SVD |
| Análise semântica | LSA (Latent Semantic Analysis) |

## Pseudo-Inversa de Moore-Penrose

Para $A = U\Sigma V^\top$, a pseudo-inversa é:

$$A^+ = V \Sigma^+ U^\top$$

onde $\Sigma^+$ é a transposta de $\Sigma$ com cada $\sigma_i > 0$ substituído por $1/\sigma_i$.

A solução de mínimos quadrados $\min_x \|Ax - b\|_2$ é dada por $x^* = A^+ b$.

## Implementação

```python
import numpy as np

# SVD completa
A = np.random.randn(5, 3)
U, s, Vt = np.linalg.svd(A, full_matrices=True)

# Reconstrução
Sigma = np.zeros_like(A, dtype=float)
Sigma[:len(s), :len(s)] = np.diag(s)
A_reconstructed = U @ Sigma @ Vt

# Aproximação de posto k=2
k = 2
A_k = (U[:, :k] * s[:k]) @ Vt[:k, :]
print(f"Erro de aproximação: {np.linalg.norm(A - A_k, 'fro'):.4f}")
```

## Conclusão

A SVD é verdadeiramente universal: ela existe para qualquer matriz, revela a geometria
da transformação linear, e fornece a melhor aproximação de posto baixo.
Compreender a SVD profundamente é essencial para entender PCA, redes neurais de baixo posto,
e muito mais.
