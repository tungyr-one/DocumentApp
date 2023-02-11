using System;
using System.Collections.Generic;
using System.Linq;
using api.Entities;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using api.Interfaces;
using api.DTOs;
using AutoMapper;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DocsController:ControllerBase
    {
        private readonly ILogger<DocsController> _logger;
         private readonly IMapper _mapper;
        public IDocsRepository _docRepository { get; }


        public DocsController(IDocsRepository docRepository, ILogger<DocsController> logger, IMapper mapper)
        {
            _docRepository = docRepository;            
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<DocDto>> GetDocs()
        {
            var docs = await _docRepository.GetDocsAsync();
            return Ok(_mapper.Map<IEnumerable<DocDto>>(docs));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DocDto>> GetDoc(int id)
        {
            var doc = await _docRepository.GetDocAsync(id);
            return Ok(_mapper.Map<DocDto>(doc));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> CreateDoc(DocDto newDoc)
        {
            var docToDb = _mapper.Map<DocDb>(newDoc);
            _docRepository.Create(docToDb);

            if (await _docRepository.SaveAllAsync()) return Ok();
            return BadRequest("Failed to create document");
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateDoc(int id, DocDto docUpd)
        {
            var doc = await _docRepository.GetDocAsync(docUpd.Id);
            _mapper.Map(docUpd, doc);

            _docRepository.Update(doc);

            if (await _docRepository.SaveAllAsync()) return NoContent();
            return BadRequest("Failed to update document");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteDoc(int id)
       {    
            _docRepository.Delete(id);

            if (await _docRepository.SaveAllAsync()) return Ok();
            return BadRequest("Failed to delete document");
        }        
    }
}