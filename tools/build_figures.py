from pathlib import Path
import json
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.ticker import FuncFormatter

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'LabMotion'/'figuras'
OUT.mkdir(parents=True,exist_ok=True)
plt.rcParams.update({'font.family':'DejaVu Sans','font.size':11,'axes.spines.top':False,'axes.spines.right':False,'figure.facecolor':'white','axes.titleweight':'bold'})
t=np.array([.1,.2,.3,.4,.5]); x=np.array([.51,.59,.72,.80,.92])
A,B=np.polyfit(t,x,1); predicted=A*t+B
SSE=float(((x-predicted)**2).sum()); SST=float(((x-x.mean())**2).sum()); r2=1-SSE/SST
measure=np.array([4.11,4.13,4.12,4.11,4.11,4.14,4.12,4.11,4.10,4.12]); mean=measure.mean(); ua=measure.std(ddof=1)/np.sqrt(len(measure)); ub=.01/np.sqrt(12); uc=np.hypot(ua,ub)
fmt=FuncFormatter(lambda val,pos:f'{val:g}'.replace('.',','))
def setup(ax,xlab,ylab):
    ax.set_xlabel(xlab);ax.set_ylabel(ylab);ax.grid(alpha=.22);ax.xaxis.set_major_formatter(fmt);ax.yaxis.set_major_formatter(fmt)
fig,(ax,res)=plt.subplots(2,1,figsize=(8.5,6),gridspec_kw={'height_ratios':[2.5,1]},layout='constrained')
ax.scatter(t,x,c='#205b70',s=60,label='Dados didáticos',zorder=3);grid=np.linspace(0,.55,100);ax.plot(grid,A*grid+B,color='#bd472e',label='Ajuste por mínimos quadrados');ax.legend(loc='upper left');ax.set_title('MRU e análise dos resíduos');setup(ax,'Tempo t (s)','Posição x (m)')
res.axhline(0,color='#555555',lw=1);res.scatter(t,x-predicted,c='#205b70',s=40);setup(res,'Tempo t (s)','Resíduo (m)')
fig.savefig(OUT/'mru_ajuste.png',dpi=210);plt.close(fig)
tm=np.array([0,.5,1,1.5,2]); xm=.2*tm**2
fig,axes=plt.subplots(1,2,figsize=(10,4),layout='constrained');cur=np.linspace(0,2,100)
axes[0].plot(cur,.2*cur**2,c='#bd472e');axes[0].scatter(tm,xm,c='#205b70',zorder=3);axes[0].set_title('Relação quadrática');setup(axes[0],'Tempo t (s)','Posição x (m)')
axes[1].plot(cur**2,.2*cur**2,c='#bd472e');axes[1].scatter(tm**2,xm,c='#205b70',zorder=3);axes[1].set_title('Linearização');setup(axes[1],'Tempo ao quadrado t² (s²)','Posição x (m)')
fig.savefig(OUT/'mruv_linearizacao.png',dpi=210);plt.close(fig)
fig,ax=plt.subplots(figsize=(10,2.05),layout='constrained');ax.set_axis_off();labels=['Medir','Representar','Modelar','Interpretar','Argumentar'];colors=['#d6e8ef','#ddd3f3','#f8e4a4','#f7d6cb','#d8e8dc']
for i,(lab,col) in enumerate(zip(labels,colors)):
    xx=.02+i*.198;ax.text(xx+.08,.53,lab,ha='center',va='center',fontsize=12,bbox={'boxstyle':'round,pad=.8','fc':col,'ec':'#444444','lw':1});
    if i<4:ax.annotate('',xy=(xx+.196,.53),xytext=(xx+.16,.53),arrowprops={'arrowstyle':'->','color':'#444444'})
fig.savefig(OUT/'percurso.png',dpi=210);plt.close(fig)
result={'mru':{'A':float(A),'B':float(B),'SSE':SSE,'SST':SST,'R2':r2,'residuos':(x-predicted).tolist()},'medidas':{'N':len(measure),'soma':float(measure.sum()),'media':float(mean),'desvio_amostral':float(measure.std(ddof=1)),'uA':float(ua),'uB_resolucao_retangular':float(ub),'uc_retangular':float(uc),'uc_convencao_uB_001':float(np.hypot(ua,.01))},'mruv':{'coeficiente':.2,'aceleracao':.4}}
(ROOT/'LabMotion'/'calculos_verificados.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(result,ensure_ascii=False,indent=2))
