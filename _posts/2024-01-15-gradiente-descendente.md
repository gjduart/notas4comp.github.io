---
layout: post
title: "Gradiente Descendente: Teoria e Intuição Matemática"
date: 2024-01-15 10:00:00 -0300
categories: [otimizacao]
tags: [gradiente, otimização, cálculo, machine-learning]
description: "Uma exploração completa do gradiente descendente, desde a intuição geométrica até a convergência formal."
reading_time: 12
---

O **gradiente descendente** é o algoritmo de otimização mais fundamental em Machine Learning.
Neste post, vamos derivar o método do zero e entender sua geometria.

## O Problema de Otimização

Dado uma função de perda $\mathcal{L}: \mathbb{R}^n \to \mathbb{R}$, queremos encontrar:

$$\theta^* = \arg\min_{\theta \in \mathbb{R}^n} \mathcal{L}(\theta)$$

Para funções diferenciáveis, o gradiente $\nabla_\theta \mathcal{L}$ nos diz a **direção de maior crescimento**.
Portanto, a direção de maior decrescimento é $-\nabla_\theta \mathcal{L}$.

## Intuição Geométrica

Imagine uma superfície montanhosa. Você está num ponto qualquer e quer chegar ao vale.
A estratégia do gradiente descendente é simples: **sempre siga a direção mais íngreme para baixo**.

Matematicamente, a atualização é:

$$\theta_{t+1} = \theta_t - \eta \cdot \nabla_\theta \mathcal{L}(\theta_t)$$

onde $\eta > 0$ é a **taxa de aprendizado** (learning rate).

## Derivação via Expansão de Taylor

Por que a direção $-\nabla \mathcal{L}$ é a melhor? Usemos a expansão de Taylor de primeira ordem:

$$\mathcal{L}(\theta + \delta) \approx \mathcal{L}(\theta) + \nabla_\theta \mathcal{L}(\theta)^\top \delta + O(\|\delta\|^2)$$

Queremos escolher $\delta$ com $\|\delta\| = \epsilon$ (passo fixo) que **minimize** o lado direito.
Isso equivale a minimizar $\nabla \mathcal{L}^\top \delta$ sujeito a $\|\delta\| = \epsilon$.

Pela desigualdade de Cauchy-Schwarz:

$$\nabla \mathcal{L}^\top \delta \geq -\|\nabla \mathcal{L}\| \cdot \|\delta\|$$

com igualdade quando $\delta = -\epsilon \frac{\nabla \mathcal{L}}{\|\nabla \mathcal{L}\|}$.

Portanto, a **direção ótima** de descida (para passos pequenos) é de fato $-\nabla \mathcal{L}$.

## Convergência para Funções Convexas

### Condição de Lipschitz no Gradiente

Assumimos que $\nabla \mathcal{L}$ é $L$-Lipschitz contínuo:

$$\|\nabla \mathcal{L}(\theta) - \nabla \mathcal{L}(\phi)\| \leq L \|\theta - \phi\| \quad \forall \theta, \phi$$

Isso garante que a função não "muda rápido demais".

### Teorema de Convergência

**Teorema:** Se $\mathcal{L}$ é convexo com gradiente $L$-Lipschitz e $\theta^*$ é o mínimo global, então com $\eta = 1/L$:

$$\mathcal{L}(\theta_T) - \mathcal{L}(\theta^*) \leq \frac{L \|\theta_0 - \theta^*\|^2}{2T}$$

**Prova (esboço):**

Da condição de Lipschitz, temos o *descent lemma*:

$$\mathcal{L}(\theta_{t+1}) \leq \mathcal{L}(\theta_t) - \eta\left(1 - \frac{\eta L}{2}\right)\|\nabla \mathcal{L}(\theta_t)\|^2$$

Com $\eta = 1/L$:

$$\mathcal{L}(\theta_{t+1}) \leq \mathcal{L}(\theta_t) - \frac{1}{2L}\|\nabla \mathcal{L}(\theta_t)\|^2$$

Combinando com a convexidade ($\mathcal{L}(\theta^*) \geq \mathcal{L}(\theta_t) + \nabla \mathcal{L}(\theta_t)^\top(\theta^* - \theta_t)$), obtemos a taxa $O(1/T)$. $\square$

## Escolha da Taxa de Aprendizado

A escolha de $\eta$ é crítica:

| Situação | Efeito |
|----------|--------|
| $\eta$ muito grande | Divergência / oscilação |
| $\eta$ muito pequeno | Convergência lenta |
| $\eta = 1/L$ | Convergência garantida |

## Variantes Importantes

### Mini-Batch SGD

Em vez de usar todos os dados, usamos um mini-batch $\mathcal{B} \subset [n]$:

$$\theta_{t+1} = \theta_t - \eta \cdot \frac{1}{|\mathcal{B}|} \sum_{i \in \mathcal{B}} \nabla \ell_i(\theta_t)$$

O gradiente estocástico é um estimador não-viesado: $\mathbb{E}[\nabla \ell_{\mathcal{B}}] = \nabla \mathcal{L}$.

### Momento (Momentum)

Acumula gradientes passados para suavizar a trajetória:

$$v_{t+1} = \beta v_t + \nabla \mathcal{L}(\theta_t)$$
$$\theta_{t+1} = \theta_t - \eta v_{t+1}$$

## Conclusão

O gradiente descendente é elegante em sua simplicidade: apenas siga a derivada.
Nos próximos posts, veremos métodos de segunda ordem (Newton, BFGS) que usam a Hessiana
$\nabla^2 \mathcal{L}$ para convergência mais rápida, porém com maior custo computacional.

**Próximo post:** [Método de Newton e Quasi-Newton](#)
