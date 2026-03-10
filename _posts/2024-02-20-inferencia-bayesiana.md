---
layout: post
title: "Inferência Bayesiana: Do Teorema de Bayes ao Posterior"
date: 2024-02-20 10:00:00 -0300
categories: [probabilidade]
tags: [bayes, probabilidade, inferência, prior, posterior]
description: "Como o teorema de Bayes fundamenta uma filosofia completa de aprendizado e inferência estatística."
reading_time: 8
---

A **inferência bayesiana** é uma abordagem à estatística que trata probabilidade como
**grau de crença**, atualizando crenças à medida que novos dados chegam.

## O Teorema de Bayes

O resultado central é simples e elegante:

$$P(\theta \mid \mathcal{D}) = \frac{P(\mathcal{D} \mid \theta) \, P(\theta)}{P(\mathcal{D})}$$

onde:
- $P(\theta)$ — **prior**: crença sobre $\theta$ antes dos dados
- $P(\mathcal{D} \mid \theta)$ — **verossimilhança**: probabilidade dos dados dado $\theta$
- $P(\mathcal{D})$ — **evidência**: constante normalizadora
- $P(\theta \mid \mathcal{D})$ — **posterior**: crença atualizada após os dados

A intuição: começamos com uma crença ($prior$), observamos dados, e atualizamos nossa crença ($posterior$).

## Exemplo: Estimativa de Proporção

Queremos estimar a probabilidade $\theta$ de cara em uma moeda.

**Prior:** Assumimos $\theta \sim \text{Beta}(\alpha, \beta)$ (prior conjugado).

$$P(\theta) = \frac{\theta^{\alpha-1}(1-\theta)^{\beta-1}}{B(\alpha,\beta)}$$

**Verossimilhança:** Observamos $H$ caras e $T$ coroas:

$$P(\mathcal{D} \mid \theta) = \theta^H (1-\theta)^T$$

**Posterior:** O prior Beta é conjugado à verossimilhança Binomial:

$$P(\theta \mid \mathcal{D}) \propto \theta^{H+\alpha-1}(1-\theta)^{T+\beta-1}$$

Portanto: $\theta \mid \mathcal{D} \sim \text{Beta}(\alpha + H, \beta + T)$

A média posterior é:

$$\mathbb{E}[\theta \mid \mathcal{D}] = \frac{\alpha + H}{\alpha + \beta + H + T}$$

## Maximum A Posteriori (MAP)

Em vez da distribuição completa, podemos buscar a moda do posterior:

$$\theta^{MAP} = \arg\max_\theta \log P(\theta \mid \mathcal{D}) = \arg\max_\theta \left[\log P(\mathcal{D} \mid \theta) + \log P(\theta)\right]$$

**Insight:** MAP é equivalente a máxima verossimilhança com **regularização**!
O $\log P(\theta)$ age como termo regularizador:
- Prior Gaussiano $\Rightarrow$ regularização $L_2$ (Ridge)
- Prior Laplaciano $\Rightarrow$ regularização $L_1$ (Lasso)

## Posterior Preditivo

Para fazer previsões, marginalizamos sobre o posterior:

$$P(x_{new} \mid \mathcal{D}) = \int P(x_{new} \mid \theta) P(\theta \mid \mathcal{D}) \, d\theta$$

Isso **incorpora incerteza sobre os parâmetros** na previsão — uma vantagem fundamental sobre métodos pontuais.

## Comparação: Bayesiano vs. Frequentista

| Aspecto | Bayesiano | Frequentista |
|---------|-----------|--------------|
| Probabilidade | Grau de crença | Frequência limite |
| Parâmetros | Variáveis aleatórias | Quantidades fixas |
| Inferência | Distribuição posterior | Estimativas pontuais |
| Incerteza | Via posterior | Via intervalos de confiança |
| Dados necessários | Funciona com poucos | Precisa de muitos |

## Implementação com PyMC

```python
import pymc as pm
import numpy as np

# Dados: 7 caras em 10 lançamentos
H, N = 7, 10

with pm.Model() as modelo:
    # Prior
    theta = pm.Beta('theta', alpha=2, beta=2)

    # Verossimilhança
    obs = pm.Binomial('obs', n=N, p=theta, observed=H)

    # Amostragem MCMC
    trace = pm.sample(2000, return_inferencedata=True)

pm.plot_posterior(trace, var_names=['theta'])
```

## Conclusão

A inferência bayesiana oferece uma estrutura coerente para aprendizado:
começamos com conhecimento prévio, observamos dados, e atualizamos sistematicamente.
A chave está em escolher priors que reflitam conhecimento genuíno — nem muito informativos,
nem completamente vagos.

No próximo post, veremos **Processos Gaussianos**: a extensão bayesiana para funções.
