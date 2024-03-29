using System.Threading.Tasks;
using DocumentApp.DTOs;
using DocumentApp.Helpers;
using DocumentApp.Interfaces.ServicesInterfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using Microsoft.AspNetCore.Http;
using System.Net;

namespace DocumentApp.Controllers
{
   [ApiController]
   [Route("api/[controller]")]
   public class DocsController : ControllerBase
   {
      private readonly IDocsService _docsService;

      public DocsController(IDocsService docsService)
      {
         _docsService = docsService;
      }

        ///<summary>
        /// Gets document from service, if null returns NotFound
        ///</summary>
      [HttpGet("{id}")]
      public async Task<ActionResult<DocDto>> GetDoc(int id)
      {
         return await _docsService.GetDocAsync(id) switch
         {
            null => NotFound(),
            var doc => Ok(doc)
         };
      }

      ///<summary>
      /// Gets documents list
      ///</summary>
      [HttpPost]
      public async Task<ActionResult<Pagination<DocDto>>> GetDocs(UserParams userParams)
      {
         var docs = await _docsService.GetDocsAsync(userParams);
         HttpContext.Response.StatusCode = 200;
         await HttpContext.Response.WriteAsJsonAsync(docs);
         return new EmptyResult();
      }

        ///<summary>
        /// Creates document 
        ///</summary>
      [HttpPost("new")]
      public async Task<ActionResult> CreateDocAsync(DocNewDto newDoc)
      {
         if (await _docsService.CreateAsync(newDoc)) return Ok();
         return BadRequest("Failed to create document");
      }

        ///<summary>
        /// Updates document 
        ///</summary>
      [HttpPut("{id}")]
      public Task Update(int id, DocUpdateDto docUpdate) => _docsService.UpdateAsync(id, docUpdate);
      // public async Task UpdateDocAsync(int id, DocUpdateDto docUpdate)
      // {
      //    // await _docsService.UpdateAsync(id, docUpdate);
      //    // return NoContent();
      //    await _docsService.UpdateAsync(id, docUpdate);
      // }

        ///<summary>
        /// Deletes document
        ///</summary>
      [HttpDelete("{id}")]
      public async Task<ActionResult> DeleteDocAsync(int id)
      {
         if (await _docsService.DeleteAsync(id)) return Ok();
         return BadRequest("Failed to delete document");
      }
   }
}