import { Injectable, NotFoundException } from "@nestjs/common";
import { retry } from "rxjs";
import {Produto} from "./produtos.model"

@Injectable()
export class ProdutosService{
    produtos :Produto[] = []; 
    insertProduto(title: string, desc: string, price: number){
        const id = Math.random().toString();
        const newProduto = new Produto(id, title, desc,price );
        this.produtos.push(newProduto);
        return id;
    }
    getProdutos(){
        return [...this.produtos];
    }
    getProdutoById(id: string){
        const resultado = this.getProduto(id);
        let produto = {...resultado[0]};
        return produto;
    }

    patchProduto(id, title,desc,price){
        let [{...produto},index] = this.getProduto(id);
        if(title){
            produto.title = title;
        }
        if(desc){
            produto.description = desc;
        }
        if(price){
            produto.price = price
        }
        this.produtos[index] = produto;
        return null;
    }

    deleteProduto(id:string){
        const index = this.getProduto(id)[1];
        this.produtos.splice(index,1);
    }

    private getProduto(id: string): [Produto, number]{
        const produtoIndex = this.produtos.findIndex((prod)=>prod.id === id);
        const produto = this.produtos[produtoIndex];
        if(!produto){
            throw new NotFoundException('produto não encontrado..');
        }else{
            return [produto,produtoIndex];
        }
    }
}