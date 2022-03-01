import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { get } from "http";
import { title } from "process";
import { ProdutosService } from "./produtos.service";

@Controller('produtos')
export class ProdutosController{
    constructor( private readonly produtosService: ProdutosService){}
    @Post()
    addProduto(
        @Body() Body:any, //para captura o objeto Body todo
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number
    ){
        const generatedId = this.produtosService.insertProduto(
            prodTitle,
            prodDesc,
            prodPrice
            );
            return {id:generatedId}
    }

    @Get()
  getProdutos() {
    return this.produtosService.getProdutos();
  }
  @Get(':id')
  getProduto(@Param('id') prodId: string){
    return this.produtosService.getProdutoById(prodId);
  }

  @Patch(':id')
  patchProduto(
      @Param('id')prodId :string,
      @Body('title') prodTitle: string,
      @Body('price') prodPrice: string,
      @Body('description') prodDesc: string
  ){
      this.produtosService.patchProduto(prodId, prodTitle,prodDesc, prodPrice);
  }

  @Delete(':id')
  deleteProduto(@Param('id') id: string){
    this.produtosService.deleteProduto(id);
  }
}